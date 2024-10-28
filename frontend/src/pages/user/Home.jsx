import ProductCard from "../../components/ProductCard.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () => {
    const [products, setProducts] = useState([])

    async function ReadProducts() {
        let url = "http://localhost:5000/home-page-products";

        let response = await fetch(url);
        response = await response.json();

        if (response.error === "") {
            setProducts(response.records)
        }
    }

    useEffect(() => {
        ReadProducts();
    }, []);

    return (
        <>
            {/* Slider */}
            <div className="section">
                <div className="hero-slider">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="hero-slide-item swiper-slide">
                                <div className="hero-slide-bg">
                                    <img src="/assets/images/slider/banner.png" alt="Slider Image"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section section-margin">
                <div className="container">
                    <div className="section-title m-3 aos-init aos-animate">
                        <h1 className="title">Products</h1>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="row shop_wrapper grid_4">

                                {products.length > 0 &&
                                    products.map(product => <ProductCard key={product.pro_id} product={product}/>)}

                                {products.length === 0 &&
                                    <div className="col-12">
                                        <h4 className="text-center alert alert-danger">No Data Available</h4>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>

                    {products.length > 0 &&
                        <div className="text-center mt-10">
                            <Link to="/shop" className="btn btn-sm btn-outline-success">more products</Link>
                        </div>
                    }

                </div>
            </div>
        </>
    );
};

export default Home;
