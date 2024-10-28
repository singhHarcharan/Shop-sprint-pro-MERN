import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import BreadCrumb from "../../components/BreadCrumb";
import BillingForm from "../../components/BillingForm.jsx";

const Checkout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("userToken");

        async function ReadUserData(token) {
            let url = "http://localhost:5000/checkout-data";

            let response = await fetch(url, {
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            });
            response = await response.json();


            if (response.error === "") {
                // console.log(response.record)
                setUser(response.record)
            }
        }

        if (!token) {
            navigate("/cart");
        } else {
            ReadUserData(token).then()
        }
    }, [])

    return (
        <>
            <BreadCrumb pageTitle="Checkout"/>

            <div className="section section-margin">
                <div className="container">
                    {user.length > 0 &&
                        <BillingForm user={user}/>
                    }
                </div>
            </div>

        </>
    )

}

export default Checkout