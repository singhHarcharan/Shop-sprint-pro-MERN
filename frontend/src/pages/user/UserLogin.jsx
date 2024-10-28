import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";

const UserLogin = () => {
    const {ReadCartCount} = useContext(UserContext);
    const navigate = useNavigate();

    let {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    async function onSubmit(data) {
        let url = "http://localhost:5000/user-login";

        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response)

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
        } else {
            ReadCartCount();
            Qual.successdb("Success", response.message);
            localStorage.setItem("userToken", response.token);
            navigate("/user/dashboard");
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="User Login"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <div className="section-content text-center"></div>
                                <br/>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-floating">
                                        <input
                                            placeholder="Enter Email"
                                            id="floatinginput"
                                            className="form-control"
                                            type="email"
                                            {...register("email", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <label htmlFor="floatinginput">Enter Email</label>
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                    </div>
                                    <br/>

                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            placeholder="Enter Password"
                                            id="password"
                                            className="form-control"
                                            {...register("password", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <label htmlFor="password">Enter Password</label>
                                        <ErrorMessage
                                            errors={errors}
                                            name="password"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                    </div>
                                    <div className="section-content text-end mt-5">
                                        <p className="desc-content">
                                            Don't have an account?{" "}
                                            <Link to="/sign-up">
                                                <u>Register</u>
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="text-center mt-3">
                                        <button className="btn btn-dark btn-hover-primary rounded-3 w-100">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UserLogin;
