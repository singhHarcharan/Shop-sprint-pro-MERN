const connection = require("../connection");
const {sign} = require("jsonwebtoken");
const emailService = require("../services/email.service")

function generateOTP() {
    // Generate a random number between 100000 and 999999 (inclusive)
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    // Convert the number to a string
    const password = randomNumber.toString();
    return password;
}

function AddCategory(req, res) {
    const {categoryName} = req.body;
    const insertCommand = `Insert Into category(CategoryName) Values('${categoryName}')`;
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "Category Added"});
        }
    });
}

function ReadHomePageProducts(req, res) {
    let readCommand = `SELECT products.*, subcategories.sub_cat FROM products INNER JOIN subcategories ON products.sub_id=subcategories.id ORDER BY pro_id DESC LIMIT 8`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records});
        }
    });
}

function ReadShopPageProducts(req, res) {
    let {sub_cat_id} = req.params;
    let readCommand = `SELECT products.*, subcategories.sub_cat FROM products INNER JOIN subcategories ON products.sub_id=subcategories.id WHERE products.sub_id=${sub_cat_id} ORDER BY products.pro_id DESC LIMIT 8`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records});
        }
    });
}

function ReadCategory(req, res) {
    let readCommand = `Select * from category`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records});
        }
    });
}

function DeleteCategory(req, res) {
    let {id} = req.params;
    let deleteCommand = `Delete from category where id=${id}`;
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "Category Deleted"});
        }
    });
}

function DeleteSubCategory(req, res) {
    let {id} = req.params;
    let deleteCommand = `Delete from subcategories where id=${id}`;
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "SubCategory Deleted"});
        }
    });
}

function DeleteProducts(req, res) {
    let {id} = req.params;
    let deleteCommand = `Delete from products where pro_id=${id}`;
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "Product Deleted"});
        }
    });
}


//Authentication
function AdminLogin(req, res) {
    // console.log(req.body);
    let {email, password} = req.body;

    if (email == "" || password == "") {
        res.json({error: "All fields are required", message: ""});
    } else {
        //Authenticate User
        let checkUser = `SELECT * FROM admin WHERE email='${email}' and password='${password}'`;
        // console.log(checkUser);
        connection.query(checkUser, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ""});
            } else {
                // console.log(record);
                if (record.length == 0) {
                    res.json({error: "Invalid Email or Password", message: ""});
                } else {
                    // generate JWT
                    let payload = {
                        id: record[0].id,
                        email: record[0].email,
                        fullName: record[0].fullName,
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

function AdminChangePassword(req, res) {
    try {
        let {password, newpassword, confirmpassword} = req.body;
        let {id} = req["adminInfo"];

        let checkOldPassword = `select * from admin where id=${id}`;
        connection.query(checkOldPassword, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ""});
            } else {
                if (record[0].password != password) {
                    res.json({error: "Invalid Current Password.", message: ""});
                } else {
                    /* new code */
                    if (newpassword != confirmpassword) {
                        res.json({
                            error: "New Password and confirm Password must be same",
                            message: "",
                        });
                    } else {
                        let updatePassword = `Update admin Set password='${newpassword}' Where id=${id}`;
                        connection.query(updatePassword, (error) => {
                            if (error) {
                                res.json({error: error.message, message: ""});
                            } else {
                                res.json({
                                    error: "",
                                    message: "Password Updated successfully",
                                });
                            }
                        });
                    }
                }
            }
        });
    } catch (error) {
        res.json({error: error.message, message: ""});
    }
}

function UserSignup(req, res) {
    console.log(req.body);
    const {full_name, email, password, phone, gender, address, state, city} =
        req.body;
    const insertCommand = `Insert Into user_signup(full_name,email,password,phone,gender,address,state,city) Values('${full_name}','${email}','${password}','${phone}','${gender}','${address}','${state}','${city}')`;
    // console.log(insertCommand);
    let checkentry = `SELECT * FROM user_signup where email='${email}'`;
    connection.query(checkentry, (error, records) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            if (records.length == 1) {
                res.json({error: "Email already exists", message: ""});
            } else {
                connection.query(insertCommand, (error, records) => {
                    if (error) {
                        res.json({error: error.message, message: ""});
                    } else {
                        res.json({error: "", message: "Category Added"});
                    }
                });
            }
        }
    });
}

function UserLogin(req, res) {
    // console.log(req.body);
    let {email, password} = req.body;
    if (email == "" || password == "") {
        res.json({error: "All fields are required", message: ""});
    } else {
        //Authenticate User
        let checkUser = `SELECT * FROM user_signup WHERE email='${email}' and password='${password}'`;
        // console.log(checkUser);
        connection.query(checkUser, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ""});
            } else {
                console.log(record);
                if (record.length == 0) {
                    res.json({error: "Invalid Email or Password", message: ""});
                } else {
                    //generate JWT
                    let payload = {
                        id: record[0].id,
                        email: record[0].email,
                        full_name: record[0].full_name,
                        password: record[0].password,
                        phone: record[0].phone,
                        gender: record[0].gender,
                        address: record[0].address,
                        state: record[0].state,
                        city: record[0].city,
                    };
                    let secret = "abc@123";
                    let expiry = 60 * 60; //60 sec

                    let token = sign(payload, secret, {expiresIn: expiry});
                    res.json({error: "", message: "Login success", token: token});
                }
            }
        });
    }
}

function AddSubCategory(req, res) {
    const {categoryname, SubCategory} = req.body;
    const insertCommand = `Insert Into subcategories(sub_cat,cat_id) Values('${SubCategory}',${categoryname})`;
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "Category Added"});
        }
    });
}

function ReadSubCategory(req, res) {
    let readCommand = `Select * from subcategories`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records});
        }
    });
}

function ReadProducts(req, res) {
    let readCommand = `Select products.*, subcategories.sub_cat, subcategories.cat_id, category.CategoryName from products inner join subcategories on products.sub_id=subcategories.id inner join category on subcategories.cat_id=category.id`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records});
        }
    });
}

function AddProducts(req, res) {
    const {subCategory, name, color, price, discount, size, description} = req.body;
    let discount_amount = price * discount / 100;
    let net_price = price - discount_amount;
    console.log(price, discount, net_price);

    const insertCommand = `Insert Into products(pro_name,color,price,size,sub_id, discount, description, net_price) Values('${name}','${color}',${price},'${size}','${subCategory}', ${discount}, '${description}', ${net_price})`;
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            res.json({error: "", message: "Product Added"});
        }
    });
}


function SubCategoryByCategory(req, res) {
    const {category_id} = req.params;
    const insertCommand = `SELECT * FROM subcategories where cat_id=${category_id}`;
    connection.query(insertCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, message: "", records: []});
        } else {
            res.json({error: "", message: "Data Fetched", records: records});
        }
    });
}

function UploadPhoto(req, res) {
    // console.log(req.params);
    // console.log(req.files);
    let {product_id} = req.params;
    let photo = req.files.photo;
    let serverPath = "public/products/" + photo.name
    let dbPath = "/products/" + photo.name

    photo.mv(serverPath, (error) => {
        if (error) {
            res.json({error: error.message, message: ""});
        } else {
            let updatePath = `Update products Set photo='${dbPath}' Where pro_id=${product_id}`;
            connection.query(updatePath, (error) => {
                if (error) {
                    res.json({error: error.message, message: ""});
                } else {
                    res.json({error: "", message: "Photo Uploaded."});
                }
            });
        }
    })
}

function ReadOrders(req, res) {
    try {
        let {action} = req.params;
        let readOrders = `SELECT bill.*, user_signup.fullname, user_signup.email FROM bill INNER JOIN user_signup ON bill.user_id=user_signup.id Where bill.status='${action}' Order By bill.id Desc`;
        connection.query(readOrders, (error, records) => {
            if (error) {
                res.json({error: error.message});
            } else {
                res.json({error: "", records});
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

async function SendOTPForOrderDelivery(req, res) {
    try {
        const otp = generateOTP();
        const {id, fullname, email} = req.body;

        /* send email... */
        const subject = "OTP";
        let htmlMessage = `<h4>Dear ${fullname}</h4>`;
        htmlMessage += `<p>OTP - ${otp}</p><br>`;

        const emailResponse = await emailService.sendEmail(email, subject, htmlMessage);
        // console.log(emailResponse)

        const saveOTP = `Update bill set otp='${otp}' Where id=${id}`;
        connection.query(saveOTP, (error) => {
            if (error) {
                res.json({error: error.message});
            } else {
                res.json({error: "", message: "OTP Sent"});
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

async function VerifyOTPForOrderDelivery(req, res) {
    try {
        const {id, otp} = req.body;


        const readOTP = `Select otp From bill Where id=${id}`;
        connection.query(readOTP, (error, record) => {
            if (error) {
                res.json({error: error.message});
            } else {
                let dbOTP = record[0].otp;

                if (dbOTP === otp.trim()) {
                    res.json({error: "", message: "OTP Verified"});
                } else {
                    res.json({error: "Invalid OTP"});
                }
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

function ShipOrder(req, res) {
    try {
        const {shipping_company, track_url, track_id, id} = req.body;

        let updateBill = `Update bill Set status='Shipped', shipping_company='${shipping_company}', track_url='${track_url}', track_id='${track_id}' Where id=${id}`;
        connection.query(updateBill, (error) => {
            if (error) {
                res.json({error: error.message});
            } else {
                res.json({error: "", message: "Order Shipped"});
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

function DeliverOrder(req, res) {
    try {
        const {received_by, id} = req.body;

        let updateBill = `Update bill Set status='Delivered', payment_status='Paid', received_by='${received_by}', payment_date=NOW() Where id=${id}`;
        connection.query(updateBill, async (error) => {
            if (error) {
                res.json({error: error.message});
            } else {
                res.json({error: "", message: "Order Delivered"});
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

const ReadHomePageSubCategory = (rows) => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (let i = 0; i < rows.length; i++) {
            let readSubCategory = `SELECT * FROM subcategories WHERE cat_id=${rows[i].id}`;
            connection.query(readSubCategory, (error, row) => {
                rows[i].subCategory = row;
                counter++;
                if (counter === rows.length) {
                    resolve(rows);
                }
            });
        }
    });
};

function ReadHomePageCategory(req, res) {
    try {
        let readCategory = `SELECT * FROM category ORDER BY id DESC LIMIT 4`;
        connection.query(readCategory, async (error, records) => {
            if (error) {
                res.json({error: error.message});
            } else {
                await ReadHomePageSubCategory(records);
                res.json({error: "", records});
            }
        });
    } catch (e) {
        res.json({error: e.message});
    }
}

module.exports = {
    ReadShopPageProducts,
    ReadHomePageCategory,
    VerifyOTPForOrderDelivery,
    SendOTPForOrderDelivery,
    DeliverOrder,
    ShipOrder,
    ReadOrders,
    ReadHomePageProducts,
    UploadPhoto,
    ReadCategory,
    ReadSubCategory,
    ReadProducts,
    UserSignup,
    UserLogin,
    AdminLogin,
    AdminChangePassword,
    AddCategory,
    AddSubCategory,
    AddProducts,
    DeleteCategory,
    DeleteSubCategory,
    DeleteProducts,
    SubCategoryByCategory
};
