import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb.jsx";

const ThankYou = () => {
    let location = useLocation();
    let navigate = useNavigate();
    // console.log(location);
    // console.log(location.state.bill_id);

    useEffect(() => {
        if (!location.state) {
            navigate("/")
        }
    })

    return (
        <>
            <BreadCrumb pageTitle="Order Placed"/>

            <div className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <img src="/assets/images/green-check-mark.jpg" alt="Green Tick" className="cart-img-res"/>
                            <h4 className="mb-5">Order Id: {location.state.bill_id}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ThankYou