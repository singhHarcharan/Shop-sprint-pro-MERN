import {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import useRazorpay from 'react-razorpay';
import {useNavigate, useLocation} from "react-router-dom";

import {UserContext} from "../context/userContext.jsx";

const BillingForm = ({user}) => {
    const {cart, cartTotal, ReadCartCount} = useContext(UserContext);
    // console.log(cart)

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [location])

    let {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        defaultValues: user[0]
    });

    async function placeOrder(response) {
        let data = getValues();

        data['cart'] = cart;
        data['total'] = cartTotal;

        if (!response) { // COD
            data['payment_mode'] = "COD";
        } else { // Online
            data['payment_mode'] = "Online";
        }

        const token = localStorage.getItem("userToken");
        const url = "http://localhost:5000/place-order";

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        // console.log(res);

        ReadCartCount();
        if (res.error === '') {
            navigate('/order-placed', {state: {bill_id: res.bill_id}});
        }
    }

    const Razorpay = useRazorpay();

    function initiateRazorpay() {
        let options = {
            key: "rzp_test_A3RM3Asww6uWvF",
            currency: 'INR',
            amount: cartTotal * 100,
            // amount: 0,
            name: "ERINA",
            description: "Online Clothe Store",
            image: "",
            // handler: function (response) {
            //     let payment_id = response.razorpay_payment_id;
            //     if (payment_id !== '') {
            //         alert(response.razorpay_payment_id);
            //         alert('Payment Done.');
            //     } else {
            //         alert('Payment Failed.');
            //     }
            // },
            handler: function (response) {
                placeOrder(response)
            },
            prefill: {
                name: user[0].fullname,
                email: user[0].email,
                contact: user[0].phone,
            },
            theme: {
                "color": "#F29600",
                // hide_topbar: false
            }
        };

        // options.amount = cartTotal * 100;

        let rzp = new window.Razorpay(options);
        rzp.open();
    }

    function checkPaymentMode(data) {
        if (data.payment_mode === "COD") {
            placeOrder(null)
        } else if (data.payment_mode === "Online") {
            initiateRazorpay()
        }
    }

    return (
        <form onSubmit={handleSubmit(checkPaymentMode)}>
            <div className="row mb-n4">
                <div className="col-lg-6 col-12 mb-4">
                    <div className="checkbox-form">
                        <h3 className="title">Billing Details</h3>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="checkout-form-list">
                                    <p className="mb-0">Customer Name</p>
                                    <h3 className="text-danger">{user[0].fullname}</h3>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="checkout-form-list">
                                    <label htmlFor="address">Address <span className="required">*</span></label>
                                    <textarea placeholder="Street address" className="form-control" id="address"
                                              {...register("address", {required: "This field is required"})}
                                    />

                                    <ErrorMessage errors={errors} name="address"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="checkout-form-list">
                                    <label htmlFor="city">
                                        City <span className="required">*</span>
                                    </label>
                                    <input type="text"
                                           id="city" {...register("city", {required: "This field is required"})}/>

                                    <ErrorMessage errors={errors} name="city"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="checkout-form-list">
                                    <label htmlFor="state">
                                        State <span className="required">*</span>
                                    </label>
                                    <input placeholder="" type="text" id="state"
                                           {...register("state", {required: "This field is required"})}/>

                                    <ErrorMessage errors={errors} name="state"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="checkout-form-list">
                                    <label htmlFor="pinCode">
                                        Postcode / Zip <span className="required">*</span>
                                    </label>
                                    <input placeholder="" type="text" id="pinCode"
                                           {...register("pinCode", {required: "This field is required"})}/>

                                    <ErrorMessage errors={errors} name="pinCode"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="checkout-form-list">
                                    <label htmlFor="email">
                                        Email Address <span className="required">*</span>
                                    </label>
                                    <input placeholder="" id="email"
                                           type="email" {...register("email", {required: "This field is required"})}/>

                                    <ErrorMessage errors={errors} name="email"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="checkout-form-list">
                                    <label htmlFor="phone">Phone <span className="required">*</span></label>
                                    <input type="text" id="phone"
                                           {...register("phone", {required: "This field is required"})}/>

                                    <ErrorMessage errors={errors} name="phone"
                                                  render={({message}) => (<p className="error-msg">{message}</p>)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-12 mb-4">
                    <div className="your-order-area border">
                        <h3 className="title">Your order</h3>

                        <div className="your-order-table table-responsive">
                            <table className="table">
                                <thead>
                                <tr className="cart-product-head">
                                    <th className="cart-product-name text-start">Product</th>
                                    <th className="cart-product-total text-end">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.map(x =>
                                    <tr key={x.id} className="cart_item">
                                        <td className="cart-product-name text-start ps-0">
                                            {x.pro_name}<strong className="product-quantity"> × {x.quantity}</strong>
                                        </td>
                                        <td className="cart-product-total text-end pe-0">
                                            <span className="amount">&#x20b9; {x.price * x.quantity}</span>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                <tfoot>
                                <tr className="order-total">
                                    <th className="text-start ps-0">Order Total</th>
                                    <td className="text-end pe-0"><strong><span
                                        className="amount">&#x20b9; {cartTotal}</span></strong></td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="payment-accordion-order-button">
                            <div>
                                <p className="title fw-bold text-dark fs-6">How you'll pay</p>
                                <input type="radio" {...register('payment_mode')} defaultChecked id="Online"
                                       value="Online"/>
                                <label htmlFor="Online">&nbsp;Online</label> <br/>
                                <input type="radio" {...register('payment_mode')} id="COD" value="COD"/>
                                <label htmlFor="COD">&nbsp;Cash On Delivery</label>
                            </div>

                            {/* Button - Place Order */}
                            <div className="order-button-payment">
                                <button className="btn btn-dark btn-hover-primary rounded-0 w-100">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default BillingForm