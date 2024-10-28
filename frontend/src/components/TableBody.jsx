import {useState} from "react";
import {useForm} from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import {ErrorMessage} from "@hookform/error-message";

import VerifyOTP from "./VerifyOTP.jsx";

const TableBody = ({value, ReadOrders}) => {
    const [billId, setBillId] = useState('');
    const [fullNmae, setFullName] = useState('');
    const [sendingOTP, setSendingOTP] = useState(false);
    const [verified, setVerified] = useState(false);

    /* ----------------------------------- */

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function ShowModal(id, fullname, email) {
        setSendingOTP(true);
        const data = {id: id, fullname: fullname, email: email};
        const token = localStorage.getItem("adminToken");

        let url = "http://localhost:5000/admin-send-delivery-otp";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
        } else {
            setBillId(id);
            setFullName(fullname);
            handleShow();
        }
        setSendingOTP(false)
    }

    /* ----------------------------------- */

    let {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    async function onSubmit(data) {
        data['id'] = billId;
        const token = localStorage.getItem("adminToken");
        let url = "http://localhost:5000/admin-deliver-order";

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
        } else {
            reset();
            handleClose();
            setBillId('');
            setVerified(false);
            ReadOrders('Shipped').then();
            Qual.successdb("Success", response.message);
        }
    }

    return (
        <>
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
                <td>
                    <button disabled={sendingOTP} type="button" style={{width: '101px'}}
                            onClick={() => ShowModal(value.id, `${value.fullname}`, `${value.email}`)}
                            className="btn btn-dark btn-sm">
                        {sendingOTP ?
                            <span className="spinner spinner-border spinner-border-sm"></span> : 'Deliver Now'}
                    </button>
                </td>
            </tr>

            {/* MODAL */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{verified ? 'Deliver Order' : 'Verify OTP'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {verified ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="received_by">Order Received By</label>
                                <input type="text" id="received_by" className="form-control" placeholder="enter name..."
                                       {...register("received_by", {required: "This field is required"})}/>

                                <ErrorMessage errors={errors} name="received_by"
                                              render={({message}) => <p className="text-danger">{message}</p>}
                                />
                            </div>

                            <button className="btn btn-primary">Submit</button>
                        </form>
                        : <VerifyOTP billId={billId} setVerifiedHandler={setVerified}/>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
export default TableBody