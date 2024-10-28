import BreadCrumb from "../../components/BreadCrumb.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductCard from "../../components/ProductCard.jsx";
import npf from "../../assets/npf.jpg"

const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [products, setProducts] = useState([])

    async function ReadProducts(sub_cat_id) {
        // console.log(sub_cat_id);
        let url = "http://localhost:5000/products/" + sub_cat_id;

        let response = await fetch(url);
        response = await response.json();
        // console.log(response.records)

        if (response.error === "") {
            setProducts(response.records)
        }
    }

    useEffect(() => {
        if (!location.state) {
            navigate("/")
        } else {
            const {id} = location.state;
            ReadProducts(id).then();
        }
    }, [location]);

    return (
        <>
            <BreadCrumb pageTitle="Products"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row shop_wrapper grid_4">

                                {products.length > 0 &&
                                    products.map(product =>
                                        <ProductCard
                                            key={product.pro_id}
                                            product={product}
                                        />
                                    )}

                                {products.length === 0 && <div className="text-center">
                                    <img src={npf} alt="product_not_found" className="product-not-found"/>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Products;