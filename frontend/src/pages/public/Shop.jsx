import BreadCrumb from "../../components/BreadCrumb.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Shop = () => {
    const [products, setProducts] = useState([])

    async function ReadProducts() {
        let url = "http://localhost:5000/allproducts";

        let response = await fetch(url);
        response = await response.json();

        if(response.error === "") {
            setProducts(response.records)
        }
    }

    useEffect(() => {
        ReadProducts().then();
    }, []);

    return (
        <>
            <BreadCrumb pageTitle="Shop"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row shop_wrapper grid_4">

                                {products.map(product =>  <ProductCard key={product.pro_id} product={product}/>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Shop