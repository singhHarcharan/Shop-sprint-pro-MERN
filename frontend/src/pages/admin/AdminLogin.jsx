import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import {useNavigate} from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";

function AdminLogin() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    async function onSubmit(data) {
        let url = "http://localhost:5000/adminLogin";
        // send data in backend
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
        } else {
            localStorage.setItem("adminToken", response.token);
            navigate("/admin/dashboard");
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Admin Login"/>
            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control"
                                               id="email" name="email" placeholder="abc"
                                               {...register("email", {required: "This field is required"})}
                                        />
                                        <label htmlFor="email">Enter Email</label>

                                        <ErrorMessage errors={errors} name="email"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control"
                                               id="password" name="password"
                                               {...register("password", {required: "This field is required"})}
                                               placeholder="Enter Password"
                                        />
                                        <label htmlFor="password">Enter Password</label>

                                        <ErrorMessage errors={errors} name="password"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <button className="btn btn-dark btn-hover-primary rounded-3 w-100">
                                        Login
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

export default AdminLogin;
