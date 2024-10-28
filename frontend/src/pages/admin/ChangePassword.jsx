import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import BreadCrumb from "../../components/BreadCrumb";

function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        // console.log(data);
        let token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin-login");
        } else {
            data["token"] = token;
            let url = "http://localhost:5000/change-password";
            let response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            response = await response.json();
            // console.log(response);

            if (response.error !== "") {
                Qual.errordb('Error', response.error);
            } else {
                reset();
            }
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Manage Category"/>
            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <div className="section-content text-center mb-5">
                                    <h2 className="title mb-2">Change Password</h2>
                                </div>
                                <br/>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-floating mb-3">
                                        <input placeholder="abc" className="form-control"
                                               {...register("password", {required: 'This field is required.'})}
                                               type="password"
                                        />
                                        <label htmlFor="">Current Password</label>

                                        <ErrorMessage errors={errors} name="password"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input placeholder="abc" className="form-control"
                                               {...register("newpassword", {required: 'This field is required.'})}
                                               type="password"
                                        />
                                        <label htmlFor="">New Password</label>

                                        <ErrorMessage errors={errors} name="newpassword"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input placeholder="abc" className="form-control"
                                               {...register("confirmpassword", {required: 'This field is required.'})}
                                               type="password"
                                        />
                                        <label htmlFor="">Confirm Password</label>

                                        <ErrorMessage errors={errors} name="confirmpassword"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <button id="btn" className="btn btn-dark btn-hover-primary rounded-3 w-100">
                                        Change Password
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
