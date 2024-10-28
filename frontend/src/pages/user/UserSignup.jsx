import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import BreadCrumb from "../../components/BreadCrumb";
import {Link} from "react-router-dom";

const UserSignup = () => {
    let {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    async function onSubmit(data) {
        let url = "http://localhost:5000/user-signup";

        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();

        if (response.error != "") {
            Qual.errordb("Error", response.error);
        } else {
            Qual.successdb("Registered", response.message);
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Create Account"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-10 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <div className="section-content text-center mb-5"></div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("full_name", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="full_name"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter Name</label>
                                    </div>

                                    <br/>
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("email", {
                                                required: "This field is required",
                                            })}
                                        />

                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter Email</label>
                                    </div>

                                    <br/>
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("password", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="password"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter Password</label>
                                    </div>
                                    <br/>

                                    <div className="form-floating">
                                        <input
                                            type="tel"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("phone", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="phone"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Phone Number</label>
                                    </div>
                                    <br/>

                                    <select
                                        className="form-select"
                                        {...register("gender", {
                                            required: "This field is required",
                                        })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <ErrorMessage
                                        errors={errors}
                                        name="gender"
                                        render={({message}) => (
                                            <p className="error-msg">{message}</p>
                                        )}
                                    />
                                    <br/>

                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("city", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="city"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter City</label>
                                    </div>
                                    <br/>

                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            placeholder="abc"
                                            id="floatinginput"
                                            className="form-control"
                                            {...register("state", {
                                                required: "This field is required",
                                            })}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="state"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter State</label>
                                    </div>

                                    <br/>

                                    <div className="form-floating">
                  <textarea
                      placeholder="abc"
                      id="floatinginput"
                      className="form-control"
                      {...register("address", {
                          required: "This field is required",
                      })}
                      cols="30"
                  />
                                        <ErrorMessage
                                            errors={errors}
                                            name="address"
                                            render={({message}) => (
                                                <p className="error-msg">{message}</p>
                                            )}
                                        />
                                        <label htmlFor="floatinginput">Enter Address</label>
                                    </div>
                                    <div className="section-content text-end mt-5">
                                        <p className="desc-content">
                                            Already have an account?{" "}
                                            <Link to="/user-login">
                                                <u>Login</u>
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="text-center mt-3">
                                        <button className="btn btn-dark btn-hover-primary rounded-3 w-100">SignUp
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
export default UserSignup;
