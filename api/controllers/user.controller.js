const connection = require("../connection");
const {sign} = require("jsonwebtoken");

function UserSignUp(req, res) {
    let {full_name, email, password, phone, gender, city, state, address} = req.body;

    let checkUserExists = `Select * from user_signup Where email='${email}'`;
    connection.query(checkUserExists, (error, record) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            /* Check User Exists*/
            if (record.length > 0) {
                res.json({error: 'User already exists.', message: ''})
            } else {
                /* Insert New User */
                let insertNewUser = `Insert Into user_signup(email, password, fullname, phone, gender, address, state, city) Values('${email}', '${password}', '${full_name}', '${phone}', '${gender}', '${address}', '${state}', '${city}')`;
                connection.query(insertNewUser, (error) => {
                    if (error) {
                        res.json({error: error.message, message: ''})
                    } else {
                        res.json({error: '', message: 'User Created'})
                    }
                })
            }
        }
    })
}

function UserSignIn(req, res) {
    let {email, password} = req.body;

    if (email == "" || password == "") {
        res.json({error: "All fields are required", message: ""});
    } else {
        // Authenticate User
        let checkUser = `SELECT * FROM user_signup WHERE email='${email}' and password='${password}'`;
        connection.query(checkUser, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ""});
            } else {
                if (record.length == 0) {
                    res.json({error: "Invalid Email or Password", message: ""});
                } else {
                    // generate JWT
                    let payload = {
                        id: record[0].id,
                        email: record[0].email,
                        fullName: record[0].full_name,
                    };

                    let secret = "abc@123";
                    let expiry = 60 * 60 * 24; // 60 sec

                    let token = sign(payload, secret, {expiresIn: expiry});
                    res.json({error: "", message: "Login success", token: token});
                }
            }
        });
    }
}

function AddToCart(req, res) {
    try {
        let {pro_id} = req.params;
        let {id} = req.user;

        let checkExistsInCart = `SELECT * FROM cart WHERE product_id=${pro_id} AND user_id=${id}`;
        connection.query(checkExistsInCart, (error, record) => {
            if (error) {
                res.json({error: error.message})
            } else {
                if (record.length === 0) {
                    // insert into cart table...
                    let saveProduct = `Insert Into cart(product_id, quantity, user_id) Values(${pro_id}, 1 , ${id})`;
                    connection.query(saveProduct, (error) => {
                        if (error) {
                            res.json({error: error.message})
                        } else {
                            res.json({error: '', message: 'Success'})
                        }
                    });
                } else {
                    // update quantity of product...
                    let quantity = record[0].quantity + 1;
                    let updateQuantity = `Update cart Set quantity=${quantity} Where product_id=${pro_id} AND user_id=${id}`;
                    connection.query(updateQuantity, (error) => {
                        if (error) {
                            res.json({error: error.message})
                        } else {
                            res.json({error: '', message: 'Success'})
                        }
                    });
                }
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function CartCount(req, res) {
    try {
        let {id} = req.user;

        let checkExistsInCart = `SELECT * FROM cart INNER JOIN products ON cart.product_id=products.pro_id WHERE user_id=${id}`;
        // let checkExistsInCart = `SELECT COUNT(*) AS cartCount FROM cart WHERE user_id=${id}`;
        connection.query(checkExistsInCart, (error, record) => {
            if (error) {
                res.json({error: error.message})
            } else {
                let total = 0
                for (let x of record) {
                    total += x.price * x.quantity
                }
                // console.log(total)
                res.json({error: '', record: record, total: total})
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function UpdateQuantity(req, res) {
    // console.log(req.body);
    let {id} = req.user;
    let cartId = req.body.id;
    let action = req.body.action;

    let checkExistsInCart = `SELECT * FROM cart WHERE id=${cartId} AND user_id=${id}`;
    connection.query(checkExistsInCart, (error, record) => {
        if (error) {
            res.json({error: error.message})
        } else {
            let quantity = record[0].quantity;
            let quantityToUpdate = 0;

            if (action === "dec") {
                if (quantity > 1) {
                    quantityToUpdate = quantity - 1
                } else {
                    return res.json({error: '', message: 'Cart Updated'});
                }
            } else if (action === "inc") {
                if (quantity < 5) {
                    quantityToUpdate = quantity + 1
                } else {
                    return res.json({error: '', message: 'Cart Updated'});
                }
            }

            let updateQuantity = `Update cart Set quantity=${quantityToUpdate} WHERE id=${cartId} AND user_id=${id}`;
            connection.query(updateQuantity, (error) => {
                if (error) {
                    res.json({error: error.message})
                } else {
                    res.json({error: '', message: 'Cart Updated'});
                }
            })
        }
    })
}

function RemoveFromCart(req, res) {
    try {
        let {id} = req.user;
        let {cart_id} = req.params;
        let deleteQuery = `Delete From cart Where id=${cart_id} AND user_id=${id}`;
        connection.query(deleteQuery, (error) => {
            if (error) {
                res.json({error: error.message})
            } else {
                res.json({error: '', message: 'Item Removed From Cart'});
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function CheckoutData(req, res) {
    try {
        const {id} = req.user;
        const readUserData = `Select * From user_signup Where id=${id}`;
        connection.query(readUserData, (error, record) => {
            if (error) {
                res.json({error: error.message})
            } else {
                res.json({error: "", record})
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function PlaceOrder(req, res) {
    try {
        const {id, total, payment_mode, address, city, pinCode, phone, state, cart} = req.body;
        let payment_status = "Pending";

        if (payment_mode === "Online") {
            payment_status = "Paid";
        }
        // let payment_date = "";

        /* insert into bill table... */
        const bill = `Insert Into bill(total, payment_mode, address, city, pincode, phone, user_id, state, payment_status, payment_date) Values(${total}, '${payment_mode}', '${address}', '${city}', ${pinCode}, '${phone}', ${id}, '${state}', '${payment_status}', NOW())`;
        // const bill = `Insert Into bill(total, payment_mode, address, city, pincode, phone, user_id, state, payment_status, payment_date) Values(${total}, '${payment_mode}', '${address}', '${city}', ${pinCode}, '${phone}', ${id}, '${state}', '${payment_status}', CURRENT_DATE)`;
        connection.query(bill, (error, record) => {
            if (error) {
                res.json({error: error.message})
            } else {
                const bill_id = record.insertId;
                let counter = 1;
                let cartLength = cart.length;
                let lastRowInserted = false;

                for (let i = 0; i < cartLength; i++) {
                    let {product_id, quantity, price} = cart[i];

                    let net_price = price * quantity;

                    /* insert multiple rows into bill details table... */
                    let billDetails = `Insert Into bill_details(bill_id, product_id, quantity, price, net_price) Values(${bill_id}, ${product_id}, ${quantity}, ${price}, ${net_price})`;
                    connection.query(billDetails, (error) => {
                        if (error) {
                            res.json({error: error.message})
                        }

                        if (counter === cartLength) {
                            /* empty cart table for the current customer... */
                            const deleteCart = `Delete From cart where user_id=${id}`;
                            connection.query(deleteCart, (error) => {
                                if (error) {
                                    return res.json({error: error.message})
                                }
                                res.json({error: "", message: "Order Placed", bill_id});
                            })
                        }

                        counter++;
                    })
                }
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

const OrderDetails = (rows) => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (let i = 0; i < rows.length; i++) {
            let bill_details = `SELECT bill_details.*, products.pro_name, products.photo, products.size, products.color FROM bill_details INNER JOIN products ON bill_details.product_id=products.pro_id WHERE bill_details.bill_id=${rows[i].id}`;
            connection.query(bill_details, (error, row) => {
                rows[i].order_details = row;
                counter++;
                if (counter === rows.length) {
                    resolve(rows);
                }
            });
        }
    });
};

function MyOrders(req, res) {
    try {
        const {id} = req.user;

        const orders = `SELECT *, DATE_FORMAT(payment_date, "%Y-%m-%d") AS payment_date FROM bill WHERE user_id=${id} ORDER BY id DESC`;
        connection.query(orders, async (error, records) => {
            if (error) {
                return res.json({error: error.message})
            }

            await OrderDetails(records);

            res.json({error: "", records});
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function ChangePassword(req, res) {
    try {
        let {password, newpassword, confirmpassword} = req.body;
        const {id} = req.user;

        let checkOldPassword = `select * from user_signup where id=${id}`;
        connection.query(checkOldPassword, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ""});
            } else {
                if (record[0].password !== password) {
                    res.json({error: "Invalid Current Password.", message: ""});
                } else {
                    if (newpassword !== confirmpassword) {
                        res.json({error: "New Password and confirm Password must be same", message: "",});
                    } else {
                        let updatePassword = `Update user_signup Set password='${newpassword}' Where id=${id}`;
                        connection.query(updatePassword, (error) => {
                            if (error) {
                                res.json({error: error.message, message: ""});
                            } else {
                                res.json({error: "", message: "Password Updated successfully",});
                            }
                        });
                    }
                }
            }
        });
    } catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {
    ChangePassword,
    MyOrders,
    PlaceOrder,
    CheckoutData,
    RemoveFromCart,
    UpdateQuantity,
    CartCount,
    AddToCart,
    UserSignUp,
    UserSignIn
}