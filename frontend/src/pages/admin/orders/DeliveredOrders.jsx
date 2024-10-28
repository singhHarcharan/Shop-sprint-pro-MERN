import {useState, useEffect} from "react";
import BreadCrumb from "../../../components/BreadCrumb.jsx";

const DeliveredOrders = () => {
    const [orders, setOrders] = useState([]);

    async function ReadOrders(action) {
        const token = localStorage.getItem("adminToken");
        let url = "http://localhost:5000/admin-orders/" + action;

        let response = await fetch(url, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        response = await response.json();
        // console.log(response)

        if (response.error != "") {
            setOrders([])
        } else {
            // console.log(response.records)
            setOrders(response.records)
        }
    }

    useEffect(() => {
        ReadOrders('Delivered').then();
    }, []);

    /* ----------------------------------- */


    return (
        <>
            <BreadCrumb pageTitle="Delivered Orders"/>

            <div className="section section-margin">
                <div className="container-fluid">

                    {/* ORDERS TABLE */}
                    <div className="table-responsive mt-5">
                        <table className="table table-bordered table-light">
                            <thead>
                            <tr>
                                <th>Order&nbsp;Id</th>
                                <th>Payment Info.</th>
                                <th>Date Time</th>
                                <th>Customer</th>
                                <th>Shipping Address</th>
                                <th>Shipping Details</th>
                                <th>Received By</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(value =>
                                <tr key={value.id} style={{fontSize: '12px'}}>
                                    <td>{value.id}</td>
                                    <td style={{width: '180px'}}>
                                        <b>Order Total</b>: &#x20b9; {value.total} <br/>
                                        <b>Payment Mode</b>: {value.payment_mode} <br/>
                                        <b>Payment Status</b>: {value.payment_status === "Paid" ?
                                        <span className="badge" style={{backgroundColor: 'green'}}>Paid</span> :
                                        <span className="badge bg-danger">{value.payment_status}</span>
                                    }
                                    </td>
                                    <td>{value.date_time.split("T")[0]} {value.date_time.split("T")[1].split(".000Z")}</td>
                                    <td>
                                        Name: {value.fullname} <br/>
                                        Phone: {value.phone} <br/>
                                        Email: {value.email}
                                    </td>
                                    <td>
                                        {value.address}, {value.city}, <br/>
                                        {value.state} {value.pincode}
                                    </td>
                                    <td>
                                        Company: {value.shipping_company} <br/>
                                        Tracking URL: {value.track_url} <br/>
                                        Tracking ID: {value.track_id}
                                    </td>
                                    <td>{value.received_by}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DeliveredOrders;