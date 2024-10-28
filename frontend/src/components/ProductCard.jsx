import {useNavigate, Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/userContext.jsx";

const ProductCard = ({product}) => {
    const {ReadCartCount} = useContext(UserContext)
    let navigate = useNavigate();

    async function AddToCart(product) {
        // console.log(product.pro_id)

        let token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/user-login")
        } else {
            // console.log(token);
            let url = "http://localhost:5000/add-to-cart/" + product.pro_id;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            response = await response.json();
            // console.log(response);
            if (response.error === "") {
                ReadCartCount();
            }
        }
    }

    return (
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 product">
            <div className="product-inner">
                <div className="thumb">
                    <a href={"http://localhost:5000" + product.photo} target="_blank" className="image">
                        <img className="first-image" style={{height: '260px'}}
                             src={"http://localhost:5000" + product.photo}
                             alt="Product"/>
                        <img className="second-image" style={{height: '260px'}}
                             src={"http://localhost:5000" + product.photo}
                             alt="Product"/>
                    </a>

                    <div className="actions">
                        {/*<a href="wishlist.html" title="Wishlist" className="action wishlist"><i*/}
                        {/*    className="pe-7s-like"></i></a>*/}
                        {/*<a href="#" title="Quickview" className="action quickview"*/}
                        {/*   data-bs-toggle="modal"*/}
                        {/*   data-bs-target="#exampleModalCenter"><i className="pe-7s-search"></i></a>*/}
                        {/*<a href="compare.html" title="Compare" className="action compare"><i*/}
                        {/*    className="pe-7s-shuffle"></i></a>*/}
                    </div>
                </div>

                <div className="content">
                    <h4 className="sub-title">
                        <Link to="/product-description" state={{product: product}}>{product.sub_cat}</Link>
                    </h4>

                    <h5 className="title">
                        <Link to="/product-description" state={{product: product}}>{product.pro_name}</Link>
                    </h5>
                    {/*<span className="ratings">*/}
                    {/*<span className="rating-wrap">*/}
                    {/*    <span className="star" style={{width: '100%'}}></span>*/}
                    {/* </span>*/}
                    {/*<span className="rating-num">(4)</span>*/}
                    {/*</span>*/}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere
                        metus vitae
                        arcu imperdiet, id aliquet ante scelerisque. Sed sit amet sem vitae urna
                        fringilla
                        tempus.
                    </p>
                    <span className="price">
                                            <span className="new">&#x20b9; {product.price}</span>
                        {/*<span className="old">$42.85</span>*/}
                                            </span>
                    <div className="shop-list-btn">
                        <a title="Wishlist" href="#"
                           className="btn btn-sm btn-outline-dark btn-hover-primary wishlist">
                            <i className="fa fa-heart"></i>
                        </a>

                        <button type="button" onClick={() => AddToCart(product)}
                                className="btn btn-sm btn-outline-dark btn-hover-primary"
                                title="Add To Cart">
                            Add To Cart
                        </button>

                        <a title="Compare" href="#"
                           className="btn btn-sm btn-outline-dark btn-hover-primary compare">
                            <i className="fa fa-random"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;