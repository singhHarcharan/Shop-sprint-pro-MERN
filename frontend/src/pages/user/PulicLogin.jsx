
import { useForm } from "react-hook-form";

const PublicLogin = () => {

  let {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  
  return (
    <>

      {/* <div className="section">
        <div className="breadcrumb-area bg-light">
          <div className="container-fluid">
            <div className="breadcrumb-content text-center">
              <h1 className="title">Login | Register</h1>
              <ul>
                <li>
                  <a href="/">Home </a>
                </li>
                <li className="active"> Login | Register</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className="section section-margin">
        <div className="container">
          <div className="row mb-n10">
            <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
              <div className="login-wrapper">
                <div className="section-content text-center mb-5">
                  <h2 className="title mb-2">Login</h2>
                  <p className="desc-content">
                    Please login using account detail bellow.
                  </p>
                </div>

                <form action="#" method="post">
                  <div className="single-input-item mb-3">
                    <input type="email" placeholder="Email or Username"/>
                  </div>
                  <div className="single-input-item mb-3">
                    <input type="password" placeholder="Enter your Password"/>
                  </div>

                  <div className="single-input-item mb-3">
                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                      <div className="remember-meta mb-3">
                        <div className="custom-control custom-checkbox">
                          {/* <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe"
                          /> */}
                          {/* <label className="custom-control-label" for="rememberMe">
                            Remember Me
                          </label> */}
                        </div>
                      </div>
                      <a href="#" className="forget-pwd mb-3">
                        Forget Password?
                      </a>
                    </div>
                  </div>

                  <div className="single-input-item mb-3">
                    <button className="btn btn btn-dark btn-hover-primary rounded-0">
                      Login
                    </button>
                  </div>

                  {/* <div className="lost-password">
                    <a href="login-register.html">Create Account</a>
                  </div> */}
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
              <div className="register-wrapper">
                <div className="section-content text-center mb-5">
                  <h2 className="title mb-2">Create Account</h2>
                  <p className="desc-content">
                    Please Register using account detail bellow.
                  </p>
                </div>

                <form action="#" method="post">
                  <div className="single-input-item mb-3">
                    <input type="text" placeholder="First Name" />
                  </div>

                  <div className="single-input-item mb-3">
                    <input type="text" placeholder="Last Name" />
                  </div>

                  <div className="single-input-item mb-3">
                    <input type="email" placeholder="Email or Username" />
                  </div>

                  <div className="single-input-item mb-3">
                    <input type="password" placeholder="Enter your Password" />
                  </div>

                  <div className="single-input-item mb-3">
                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                      <div className="remember-meta mb-3">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe-2"
                          />
                          <label
                            className="custom-control-label"
                            for="rememberMe-2"
                          >
                            Subscribe Our Newsletter
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="single-input-item mb-3">
                    <button className="btn btn btn-dark btn-hover-primary rounded-0">
                      Register
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

export default PublicLogin;
