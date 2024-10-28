import BreadCrumb from "../../components/BreadCrumb.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";

const Cart = () => {
    const {cart, ReadCartCount, cartTotal} = useContext(UserContext);

    async function UpdateQuantity(id, action) {
        // console.log(id, action)

        let token = localStorage.getItem("userToken");
        if (!token) {
            // navigate
        } else {
            let data = {id, action};
            let url = "http://localhost:5000/update-cart-quantity";
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            response = await response.json();

            if (response.error === "") {
                ReadCartCount();
            }
        }
    }

    async function RemoveFromCart(id) {
        let token = localStorage.getItem("userToken");
        if (!token) {
            // navigate
        } else {
            let url = "http://localhost:5000/remove-from-cart/" + id;
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token}
            });
            response = await response.json();
            // console.log(response);

            if (response.error === "") {
                ReadCartCount();
            }
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Shopping Cart"/>

            <div className="section section-margin">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">

                            {cart.length > 0 ?
                                <div className="cart-table table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th className="pro-thumbnail">Image</th>
                                            <th className="pro-title">Product</th>
                                            <th className="pro-price">Price</th>
                                            <th className="pro-quantity">Quantity</th>
                                            <th className="pro-subtotal">Total</th>
                                            <th className="pro-remove">Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cart.map(x =>
                                            <tr key={x.id}>
                                                <td className="pro-thumbnail">
                                                    <a href="#">
                                                        <img src={"http://localhost:5000" + x.photo}
                                                             style={{width: '60px'}} alt="Product"/>
                                                    </a>
                                                </td>
                                                <td style={{width: '100px'}}>
                                                    {x.pro_name}
                                                </td>
                                                <td className="pro-price"><span>&#x20b9;{x.price}</span></td>
                                                <td className="pro-quantity">
                                                    <div className="quantity">
                                                        <div className="cart-plus-minus">
                                                            <input className="cart-plus-minus-box" value={x.quantity}
                                                                   readOnly type="text"/>
                                                            <div className="dec qtybutton"
                                                                 onClick={() => UpdateQuantity(x.id, 'dec')}>-
                                                            </div>
                                                            <div className="inc qtybutton"
                                                                 onClick={() => UpdateQuantity(x.id, 'inc')}>+
                                                            </div>
                                                            <div className="dec qtybutton"
                                                                 onClick={() => UpdateQuantity(x.id, 'dec')}>
                                                                <i className="fa fa-minus"></i>
                                                            </div>
                                                            <div className="inc qtybutton"
                                                                 onClick={() => UpdateQuantity(x.id, 'inc')}>
                                                                <i className="fa fa-plus"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="pro-subtotal">
                                                    <span>&#x20b9;{x.quantity * x.price}</span>
                                                </td>
                                                <td className="pro-remove">
                                                    {/*<a href="#">*/}
                                                    <i className="pe-7s-trash fs-5" onClick={() => RemoveFromCart(x.id)}
                                                       style={{cursor: 'pointer'}}></i>
                                                    {/*</a>*/}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>

                                    </table>
                                </div>
                                : <div className="row justify-content-center">
                                    <div className="col-md-6 text-center alert alert-danger fs-1">
                                        Your cart is empty
                                    </div>
                                </div>
                            }

                        </div>
                    </div>

                    {cart.length > 0 &&
                        <div className="row">
                            <div className="col-lg-5 ms-auto col-custom">
                                <div className="cart-calculator-wrapper">
                                    <div className="cart-calculate-items">
                                        <h3 className="title">Cart Totals</h3>

                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                <tr className="total">
                                                    <td>Total</td>
                                                    <td className="total-amount">&#x20b9;{cartTotal}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <a href="/checkout" className="btn btn-dark btn-hover-primary rounded-0 w-100">
                                        Proceed To Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Cart