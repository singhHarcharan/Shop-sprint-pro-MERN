import {useState, useEffect} from "react";

import BreadCrumb from "../../../components/BreadCrumb.jsx";
import TableBody from "../../../components/TableBody.jsx";

const ShippedOrders = () => {

    const [orders, setOrders] = useState([]);
    const [billId, setBillId] = useState('');
    const [fullNmae, setFullName] = useState('');
    const [sendingOTP, setSendingOTP] = useState(false);
    const [verified, setVerified] = useState(false);

    /* ----------------------------------- */

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
        ReadOrders('Shipped').then();
    }, []);

    return (
        <>
            <BreadCrumb pageTitle="Shipped Orders"/>

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
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(value => <TableBody
                                    key={value.id}
                                    value={value}
                                    ReadOrders={ReadOrders}
                                />
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShippedOrders;