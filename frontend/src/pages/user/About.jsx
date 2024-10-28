import BreadCrumb from "../../components/BreadCrumb.jsx";

const About = () => {
    return (
        <>
            <BreadCrumb pageTitle="About Us"/>

            <div className="section section-margin overflow-hidden">
                <div className="container">
                    <div className="row mb-n6">
                        <div className="col-lg-6 align-self-center mb-6">
                            <div className="about_content">
                                <h2 className="title">
                                    Welcome To Erina Store!
                                </h2>
                                <p>Quibusdam perspiciatis pariatur magnam ducimus excepturi error libero provident animi
                                    laboriosam maiores ad explicabo ea laudantium nostrum dolor distinctio, quas fugiat
                                    doloribus, sit, possimus obcaecati ab quo vel commodi eum. Laudantium libero,
                                    voluptate rerum sunt hic,</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse numquam blanditiis
                                    quos, fuga, aspernatur doloribus expedita, soluta dolore cumque</p>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-6">
                            <div className="about_thumb">
                                <img className="fit-image" alt="About Image" src="/assets/images/about/1.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section about-feature-bg section-padding">
                <div className="container">
                    <div className="row mb-n5">
                        <div className="col-lg-4 col-md-6 mb-5">
                            <div className="feature flex-column text-center">
                                <div className="icon w-100 mb-4">
                                    <img src="/assets/images/icons/feature-icon-2.html" alt="Feature Icon"/>
                                </div>
                                <div className="content ps-0 w-100">
                                    <h5 className="title mb-2">Free Shipping</h5>
                                    <p>
                                        Enjoy Free Shipping on All Orders! Shop now and get your favorite items
                                        delivered to your doorstep without any extra cost.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5">
                            <div className="feature flex-column text-center">
                                <div className="icon w-100 mb-4">
                                    <img
                                        src="assets/images/icons/feature-icon-3.png"
                                        alt="Feature Icon"
                                    />
                                </div>
                                <div className="content ps-0 w-100">
                                    <h5 className="title mb-2">Support 24/7</h5>
                                    <p>
                                        Need assistance anytime, day or night? Look no further! Our dedicated team is
                                        here to provide you with round-the-clock support.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5">
                            <div className="feature flex-column text-center">
                                <div className="icon w-100 mb-4">
                                    <img
                                        src="assets/images/icons/feature-icon-4.png"
                                        alt="Feature Icon"
                                    />
                                </div>
                                <div className="content ps-0 w-100">
                                    <h5 className="title mb-2">Money Return</h5>
                                    <p>
                                        At SoleVerse, we prioritize your satisfaction above all else. If you're not
                                        completely delighted with your purchase, we offer a hassle-free money return
                                        policy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
