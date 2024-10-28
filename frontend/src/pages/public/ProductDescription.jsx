import {useNavigate, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import BreadCrumb from "../../components/BreadCrumb.jsx";
import {UserContext} from "../../context/userContext.jsx";

const ProductDescription = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [product, setProduct] = useState({});

    useEffect(() => {
        if (!location.state) {
            navigate("/")
        } else {
            const {product} = location.state;
            // console.log(product)
            setProduct(product)
        }
    }, []);

    const {ReadCartCount} = useContext(UserContext);

    async function AddToCart(product) {
        // console.log(product.pro_id)

        let token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/user-login")
        } else {
            // console.log(token);
            let url = "http://localhost:5000/add-to-cart/" + product.pro_id;
            let response = await fetch(url, {method: 'GET', headers: {'Authorization': 'Bearer ' + token}});
            response = await response.json();
            // console.log(response);
            if (response.error === "") {
                ReadCartCount();
            }
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Product Description"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={"http://localhost:5000" + product.photo} alt="Product"
                                         style={{height: '260px'}}/>
                                </div>
                                <div className="col-md-9">
                                    <p className="mb-0">{product.sub_cat}</p>

                                    <h4 style={{color: '#FF4545'}} className="fs-1">
                                        {product.pro_name}
                                    </h4>

                                    <p className="mb-3 text-dark">
                                        Size: {product.size}
                                        &nbsp;&nbsp;|&nbsp;&nbsp;Color: {product.color}
                                    </p>

                                    <h4 className="mb-5 fs-4">Price: {product.price}</h4>

                                    <button type="button" onClick={() => AddToCart(product)}
                                            className="btn btn-primary btn-hover-dark"
                                            title="Add To Cart">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDescription;