import BreadCrumb from "../../components/BreadCrumb.jsx";

const Contact = () => {
    return (
        <>
            <BreadCrumb pageTitle="Contact Us"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10">
                        <div className="col-12 col-lg-8 mb-10">
                            <div className="section-title">
                                <h2 className="title pb-3">Get In Touch</h2>
                                <span></span>
                                <div className="title-border-bottom"></div>
                            </div>

                            <div className="contact-form-wrapper contact-form">
                                <form action="#" id="contact-form" method="post">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-item mb-4">
                                                        <input className="input-item" type="text"
                                                               placeholder="Your Name *" name="name"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-item mb-4">
                                                        <input className="input-item" type="email" placeholder="Email *"
                                                               name="email"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-item mb-4">
                                                        <input className="input-item" type="text"
                                                               placeholder="Subject *" name="subject"/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-item mb-8">
                                                        <textarea className="textarea-item" name="message"
                                                                  placeholder="Message"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" id="submit" name="submit"
                                                            className="btn btn-dark btn-hover-primary rounded-0">Send A
                                                        Message
                                                    </button>
                                                </div>
                                                <p className="col-8 form-message mb-0"></p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <p className="form-messege"></p>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4 mb-10">
                            <div className="section-title">
                                <h2 className="title pb-3">Contact Info</h2>
                                <span></span>
                                <div className="title-border-bottom"></div>
                            </div>

                            <div className="row contact-info-wrapper mb-n6">
                                <div className="col-lg-12 col-md-6 col-sm-12 col-12 single-contact-info mb-6">

                                    <div className="single-contact-icon">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <div className="single-contact-title-content">
                                        <h4 className="title">Address</h4>
                                        <p className="desc-content">14 Mall Road, Punjab 143001,
                                            India.</p>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-12 col-12 single-contact-info mb-6">

                                    <div className="single-contact-icon">
                                        <i className="fa fa-mobile"></i>
                                    </div>
                                    <div className="single-contact-title-content">
                                        <h4 className="title">Contact Us Anytime</h4>
                                        <p className="desc-content mb-0">+91 97790 99717</p>
                                        <p className="desc-content">+91 62833 43351</p>
                                    </div>

                                </div>

                                <div className="col-lg-12 col-md-6 col-sm-12 col-12 single-contact-info mb-6">
                                    <div className="single-contact-icon">
                                        <i className="fa fa-envelope-o"></i>
                                    </div>
                                    <div className="single-contact-title-content">
                                        <h4 className="title">Support Overall</h4>
                                        <p className="desc-content">
                                            <a href="#">support@erina.com</a>
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact