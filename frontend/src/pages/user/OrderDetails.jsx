import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb.jsx";

const OrderDetails = () => {
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            navigate("/user/orders")
        } else {
            // console.log(location.state)
            setOrder(location.state)
        }
    }, []);

    return (
        <>
            <BreadCrumb pageTitle="Order Details"/>

            {order.id &&
                <div className="section py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">

                                <p>
                                    Ordered on {order.date_time.split("T")[0]}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>Order # {order.id}</span>
                                </p>

                                <div className="card margin-bottom-card ui-widget-shadow">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Shipping Address
                                                </h6>
                                                <p>
                                                    {order.address}, {order.city}, {order.state} {order.pincode}
                                                </p>
                                            </div>

                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Payment Method
                                                </h6>
                                                <p>{order.payment_mode}</p>
                                            </div>

                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Order Summary
                                                </h6>
                                                <p>Grand Total:  &#x20b9;{order.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Net Price</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {order.order_details.map(x =>
                                            <tr key={x.id}>
                                                <td>
                                                    <img src={"http://localhost:5000" + x.photo} alt={x.pro_name}
                                                         className="order-photo me-2"/>
                                                    {x.pro_name}
                                                </td>
                                                <td>{x.size}</td>
                                                <td>&#x20b9;{x.price}</td>
                                                <td>{x.quantity}</td>
                                                <td>&#x20b9;{x.net_price}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default OrderDetails;