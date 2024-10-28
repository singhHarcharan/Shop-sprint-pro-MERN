import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import Modal from 'react-bootstrap/Modal';
import BreadCrumb from "../../../components/BreadCrumb.jsx";

const PendingOrders = () => {

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
        ReadOrders('Pending').then();
    }, []);

    /* ----------------------------------- */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function ShowModal(id) {
        setBillId(id);
        handleShow();
    }

    let {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const [billId, setBillId] = useState('')

    async function onSubmit(data) {
        data['id'] = billId

        const token = localStorage.getItem("adminToken");
        let url = "http://localhost:5000/admin-ship-order";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        response = await response.json();
        console.log(response);

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
        } else {
            reset();
            handleClose();
            ReadOrders('Pending').then();
            Qual.successdb("Success", response.message);
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Pending Orders"/>

            <div className="section section-margin">
                <div className="container-fluid">

                    {/* ORDERS TABLE */}
                    <div className="table-responsive mt-5">
                        <table className="table table-bordered table-light">
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Payment Info.</th>
                                <th>Date Time</th>
                                <th>Customer</th>
                                <th>Shipping Address</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(value =>
                                <tr key={value.id} style={{fontSize: '12px'}}>
                                    <td>{value.id}</td>
                                    <td>
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
                                        <button type="button" onClick={() => ShowModal(value.id)}
                                                className="btn btn-warning text-dark btn-sm">
                                            Ship Order
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {/* MODAL */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ship Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="shipping_company">Company Name</label>
                            <input type="text" id="shipping_company" className="form-control"
                                   {...register("shipping_company", {required: "This field is required"})}/>

                            <ErrorMessage errors={errors} name="shipping_company"
                                          render={({message}) => <p className="text-danger">{message}</p>}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="track_url">Tracking URL</label>
                            <input type="text" id="track_url" className="form-control"
                                   {...register("track_url", {required: "This field is required"})}/>

                            <ErrorMessage errors={errors} name="track_url"
                                          render={({message}) => <p className="text-danger">{message}</p>}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="track_id">Tracking ID</label>
                            <input type="text" id="track_id" className="form-control"
                                   {...register("track_id", {required: "This field is required"})}/>

                            <ErrorMessage errors={errors} name="track_id"
                                          render={({message}) => <p className="text-danger">{message}</p>}
                            />
                        </div>

                        <button className="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default PendingOrders;