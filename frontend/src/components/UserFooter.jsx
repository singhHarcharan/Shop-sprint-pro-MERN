import {Link} from "react-router-dom";

const UserFooter = () => {

    return (
        <footer className="section footer-section">
            <div className="footer-top section-padding">
                <div className="container">
                    <div className="row mb-n10">
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10 me-10">
                            <div className="single-footer-widget">
                                {/*<h2 className="widget-title">Contact Us</h2>*/}
                                {/*<p className="desc-content">Contact Us and we will be more happy to assist you.</p>*/}
                                {/* <img src="/assets/images/logo/logo.png" alt="Logo"/> */}
                                <p style={{fontSize: '2rem'}}>ShopSprintPro</p>

                                <ul className="widget-address mt-5">
                                    <li><span>Address: </span>14 Mall Road, Punjab 143001, <br/>India.</li>
                                    {/*<li><span>Call to: </span> <Link to="#"> +91 01234 56789</Link></li>*/}
                                    {/*<li><span>Mail to: </span> <Link to="#"> support@redi.com</Link></li>*/}
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-2 col-xl-2 mb-10 me-10 ms-10">
                            <div className="single-footer-widget">
                                <h2 className="widget-title">Page</h2>
                                <ul className="widget-list">
                                    <li><Link to="/sign-up">Create Account</Link></li>
                                    <li><Link to="/user-login">Login</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-10 ms-10">
                            <div className="single-footer-widget">
                                <h2 className="widget-title">Newsletter</h2>
                                <div className="widget-body">
                                    <p className="desc-content mb-0">Get E-mail updates about our latest shop and
                                        special offers.</p>

                                    <div className="newsletter-form-wrap pt-4">
                                        <form id="mc-form" className="mc-form">
                                            <input type="email" id="mc-email" className="form-control email-box mb-4"
                                                   placeholder="Enter your email here.." name="EMAIL"/>
                                            <button id="mc-submit"
                                                    className="newsletter-btn btn btn-primary btn-hover-dark"
                                                    type="submit">Subscribe
                                            </button>
                                        </form>
                                        <div className="mailchimp-alerts text-centre">
                                            <div className="mailchimp-submitting"></div>
                                            <div className="mailchimp-success text-success"></div>
                                            <div className="mailchimp-error text-danger"></div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <div className="copyright-content">
                                <p className="mb-0">
                                    © {new Date().getFullYear()} <strong>Erina </strong>. ALl Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default UserFooter;
