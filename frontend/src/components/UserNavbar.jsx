import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/userContext.jsx";

function UserNavbar() {
    const {cartCount} = useContext(UserContext)

    return (
        <>
            <div className="header section">

                <div className="header-top bg-light">
                    <div className="container">
                        <div className="row row-cols-xl-2 align-items-center">

                            <div className="col d-none d-lg-block">
                                <div className="header-top-lan-curr-link">
                                    <div className="header-top-links">
                                        <Link to="/about">About Us</Link>
                                    </div>
                                    <div className="header-top-links">
                                        <Link to="/contact"> Contact Us</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <p className="header-top-message">
                                    <Link to="/" style={{textDecoration: 'none'}}>Profile</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="header-sticky">
                        <div className="container">
                            <div className="row align-items-center">

                                <div className="col-xl-2 col-6">
                                    <div className="header-logo">
                                        {/* LOGO */}
                                        <Link to="/">
                                            {/* <img src="/assets/images/logo/soleversenew.png" */}
                                                 {/* width="100%" alt="Site Logo"/> */}
                                                 ShopsPrintPro
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-8 d-none d-xl-block">
                                    <div className="main-menu position-relative">
                                        <ul>
                                            <li>
                                                <Link to="/"><span>Home</span></Link>
                                            </li>

                                            <li>
                                                <Link to="/shop"><span>Shop</span></Link>
                                            </li>

                                            <li className="has-children">
                                                <Link to="#"><span>Men</span> <i
                                                    className="fa fa-angle-down"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="#">all Shoes</Link></li>
                                                    <li><Link to="#">Running</Link></li>
                                                    <li><Link to="#">Training</Link></li>
                                                    <li><Link to="#">Sneakers</Link></li>
                                                    <li><Link to="#">LifeStyle</Link></li>
                                                    <li><Link to="#">Originals</Link></li>
                                                    <li><Link to="#">Sandals and Slides</Link></li>
                                                </ul>
                                            </li>

                                            <li className="has-children position-static">
                                                <Link to="#"><span>Women</span> <i
                                                    className="fa fa-angle-down"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="#">all Shoes</Link></li>
                                                    <li><Link to="#">Running</Link></li>
                                                    <li><Link to="#">Training</Link></li>
                                                    <li><Link to="#">Sneakers</Link></li>
                                                    <li><Link to="#">LifeStyle</Link></li>
                                                    <li><Link to="#">Originals</Link></li>
                                                    <li><Link to="#">Sandals and Slides</Link></li>
                                                </ul>
                                            </li>

                                            <li className="has-children">
                                                <Link to="#"><span>Kids</span> <i
                                                    className="fa fa-angle-down"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="#">all Shoes</Link></li>
                                                    <li><Link to="#">Older Kids ( 7 - 14 years )</Link></li>
                                                    <li><Link to="#">Younger Kids ( 4 - 7 years )</Link></li>
                                                    <li><Link to="#">Crib and Toddlers</Link></li>
                                                    <li><Link to="#">LifeStyle</Link></li>
                                                    <li><Link to="#">Running</Link></li>
                                                    <li><Link to="#">Cleats</Link></li>
                                                </ul>
                                            </li>

                                            <li className="has-children">
                                                <Link to="#"><span>New</span> <i
                                                    className="fa fa-angle-down"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="#">New arrivals</Link></li>
                                                    <li><Link to="#">Top Styles</Link></li>
                                                    <li><Link to="#">Bestsellers</Link></li>
                                                </ul>
                                            </li>

                                            <li className="has-children">
                                                <Link to="#">
                                                    <span>Settings</span>
                                                    <i className="fa fa-angle-down"></i>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li><Link to="#">Change Password</Link></li>
                                                    <li><Link to="#">Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-xl-2 col-6">
                                    <div className="header-actions">

                                        <Link to="" className="header-action-btn header-action-btn-search">
                                            <i className="pe-7s-search"></i>
                                        </Link>

                                        <Link to="/user/dashboard" className="header-action-btn d-none d-md-block">
                                            <i className="pe-7s-user"></i>
                                        </Link>

                                        <Link to="wishlist"
                                              className="header-action-btn header-action-btn-wishlist d-none d-md-block">
                                            <i className="pe-7s-like"></i>
                                        </Link>
                                        <Link to="/cart" className="header-action-btn header-action-btn-cart">
                                            <i className="pe-7s-shopbag"></i>
                                            <span className="header-action-num">{cartCount}</span>
                                        </Link>

                                        <Link to=""
                                              className="header-action-btn header-action-btn-menu d-xl-none d-lg-block">
                                            <i className="fa fa-bars"></i>
                                        </Link>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="mobile-menu-wrapper">
            <div className="offcanvas-overlay"></div>

            <div className="mobile-menu-inner">

                <div className="offcanvas-btn-close">
                    <i className="pe-7s-close"></i>
                </div><div className="mobile-navigation">
                    <nav>
                        <ul className="mobile-menu">
                            <li className="has-children">
                                <Link to="#">Home <i className="fa fa-angle-down"></i></Link>
                                <ul className="dropdown">
                                    <li><Link to="index.html">Home One</Link></li>
                                    <li><Link to="index-2.html">Home Two</Link></li>
                                </ul>
                            </li>
                            <li className="has-children">
                                <Link to="#">Shop <i className="fa fa-angle-down" aria-hidden="true"></i></Link>
                                <ul className="dropdown">
                                    <li><Link to="shop-grid.html">Shop Grid</Link></li>
                                    <li><Link to="shop-left-sidebar.html">Shop Left Sidebar</Link></li>
                                    <li><Link to="shop-right-sidebar.html">Shop Right Sidebar</Link></li>
                                    <li><Link to="shop-list-fullwidth.html">Shop List Fullwidth</Link></li>
                                    <li><Link to="shop-list-left-sidebar.html">Shop List Left Sidebar</Link></li>
                                    <li><Link to="shop-list-right-sidebar.html">Shop List Right Sidebar</Link></li>
                                    <li><Link to="wishlist.html">Wishlist</Link></li>
                                    <li><Link to="cart.html">Shopping Cart</Link></li>
                                    <li><Link to="checkout.html">Checkout</Link></li>
                                    <li><Link to="compare.html">Compare</Link></li>
                                </ul>
                            </li>
                            <li className="has-children">
                                <Link to="#">Product <i className="fa fa-angle-down" aria-hidden="true"></i></Link>
                                <ul className="dropdown">
                                    <li><Link to="single-product.html">Single Product</Link></li>
                                    <li><Link to="single-product-sale.html">Single Product Sale</Link></li>
                                    <li><Link to="single-product-group.html">Single Product Group</Link></li>
                                    <li><Link to="single-product-normal.html">Single Product Normal</Link></li>
                                    <li><Link to="single-product-affiliate.html">Single Product affiliate</Link></li>
                                    <li><Link to="single-product-slider.html">Single Product Slider</Link></li>
                                    <li><Link to="single-product-gallery-left.html">Gallery Left</Link></li>
                                    <li><Link to="single-product-gallery-right.html">Gallery Right</Link></li>
                                    <li><Link to="single-product-tab-style-left.html">Tab Style Left</Link></li>
                                    <li><Link to="single-product-tab-style-right.html">Tab Style Right</Link></li>
                                    <li><Link to="single-product-sticky-left.html">Sticky Left</Link></li>
                                    <li><Link to="single-product-sticky-right.html">Sticky Right</Link></li>
                                </ul>
                            </li>
                            <li className="has-children">
                                <Link to="#">Pages <i className="fa fa-angle-down" aria-hidden="true"></i></Link>
                                <ul className="dropdown">
                                    <li><Link to="about.html">about Us</Link></li>
                                    <li><Link to="contact.html">Contact</Link></li>
                                    <li><Link to="faq.html">Faq</Link></li>
                                    <li><Link to="404-error.html">Error 404</Link></li>
                                    <li><Link to="my-account.html">My account</Link></li>
                                    <li><Link to="login-register.html">Loging | Register</Link></li>
                                </ul>
                            </li>
                            <li className="has-children">
                                <Link to="#">Blog <i className="fa fa-angle-down" aria-hidden="true"></i></Link>
                                <ul className="dropdown">
                                    <li><Link to="blog.html">Blog</Link></li>
                                    <li><Link to="blog-left-sidebar.html">Blog Left Sidebar</Link></li>
                                    <li><Link to="blog-right-sidebar.html">Blog Right Sidebar</Link></li>
                                    <li><Link to="blog-details.html">Blog Details</Link></li>
                                    <li><Link to="blog-details-sidebar.html">Blog Details Sidebar</Link></li>
                                </ul>
                            </li>
                            <li><Link to="about.html">about</Link></li>
                            <li><Link to="contact.html">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="offcanvas-lag-curr mb-6">
                    <h2 className="title">Languages</h2>
                    <div className="header-top-lan-curr-link">
                        <div className="header-top-lan dropdown">
                            <button className="dropdown-toggle" data-bs-toggle="dropdown">English <i className="fa fa-angle-down"></i></button>
                            <ul className="dropdown-menu dropdown-menu-right animate slideIndropdown">
                                <li><Link className="dropdown-item" to="#">English</Link></li>
                                <li><Link className="dropdown-item" to="#">Japanese</Link></li>
                                <li><Link className="dropdown-item" to="#">arabic</Link></li>
                                <li><Link className="dropdown-item" to="#">Romanian</Link></li>
                            </ul>
                        </div>
                        <div className="header-top-curr dropdown">
                            <button className="dropdown-toggle" data-bs-toggle="dropdown">USD <i className="fa fa-angle-down"></i></button>
                            <ul className="dropdown-menu dropdown-menu-right animate slideIndropdown">
                                <li><Link className="dropdown-item" to="#">USD</Link></li>
                                <li><Link className="dropdown-item" to="#">Pound</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">

                    <ul className="contact-links">
                        <li><i className="fa fa-phone"></i><Link to="#"> +012 3456 789 123</Link></li>
                        <li><i className="fa fa-envelope-o"></i><Link to="#"> info@example.com</Link></li>
                        <li><i className="fa fa-clock-o"></i> <span>Monday - Sunday 9.00 - 18.00</span> </li>
                    </ul>

                    <div className="widget-social">
                        <Link title="Facebook" to="#"><i className="fa fa-facebook-f"></i></Link>
                        <Link title="Twitter" to="#"><i className="fa fa-twitter"></i></Link>
                        <Link title="Linkedin" to="#"><i className="fa fa-linkedin"></i></Link>
                        <Link title="Youtube" to="#"><i className="fa fa-youtube"></i></Link>
                        <Link title="Vimeo" to="#"><i className="fa fa-vimeo"></i></Link>
                    </div>
                </div>
            </div>
        </div> */}

                <div className="offcanvas-search">
                    <div className="offcanvas-search-inner">

                        <div className="offcanvas-btn-close">
                            <i className="pe-7s-close"></i>
                        </div>

                        <form className="offcanvas-search-form" action="#">
                            <input type="text" placeholder="Search Here..." className="offcanvas-search-input"/>
                        </form>

                    </div>
                </div>

                <div className="cart-offcanvas-wrapper">
                    <div className="offcanvas-overlay"></div>

                    <div className="cart-offcanvas-inner">

                        <div className="offcanvas-btn-close">
                            <i className="pe-7s-close"></i>
                        </div>

                        <div className="offcanvas-cart-content">
                            <h2 className="offcanvas-cart-title mb-10">Shopping Cart</h2>

                            <div className="cart-product-wrapper mb-6">

                                <div className="single-cart-product">
                                    <div className="cart-product-thumb">
                                        <Link to="single-product.html"><img
                                            src="assets/images/products/small-product/1.jpg"
                                            alt="Cart Product"/></Link>
                                    </div>
                                    <div className="cart-product-content">
                                        <h3 className="title"><Link to="single-product.html">Brother Hoddies in
                                            Grey</Link>
                                        </h3>
                                        <span className="price">
								<span className="new">$38.50</span>
                                <span className="old">$40.00</span>
                                </span>
                                    </div>
                                </div>

                                <div className="cart-product-remove">
                                    <Link to="#"><i className="fa fa-trash"></i></Link>
                                </div>

                            </div>

                            <div className="cart-product-wrapper mb-6">

                                <div className="single-cart-product">
                                    <div className="cart-product-thumb">
                                        <Link to="single-product.html"><img
                                            src="assets/images/products/small-product/2.jpg"
                                            alt="Cart Product"/></Link>
                                    </div>
                                    <div className="cart-product-content">
                                        <h3 className="title"><Link to="single-product.html">Basic Jogging Shorts</Link>
                                        </h3>
                                        <span className="price">
								<span className="new">$14.50</span>
                                <span className="old">$18.00</span>
                                </span>
                                    </div>
                                </div>
                                <div className="cart-product-remove">
                                    <Link to="#"><i className="fa fa-trash"></i></Link>
                                </div>

                            </div>

                            <div className="cart-product-wrapper mb-6">

                                <div className="single-cart-product">
                                    <div className="cart-product-thumb">
                                        <Link to="single-product.html"><img
                                            src="assets/images/products/small-product/3.html"
                                            alt="Cart Product"/></Link>
                                    </div>
                                    <div className="cart-product-content">
                                        <h3 className="title"><Link to="single-product.html">Enjoy The Rest
                                            T-Shirt</Link>
                                        </h3>
                                        <span className="price">
								<span className="new">$20.00</span>
                                <span className="old">$21.00</span>
                                </span>
                                    </div>
                                </div>

                                <div className="cart-product-remove">
                                    <Link to="#"><i className="fa fa-trash"></i></Link>
                                </div>
                            </div>

                            <div className="cart-product-total">
                                <span className="value">Subtotal</span>
                                <span className="price">220$</span>
                            </div>

                            <div className="cart-product-btn mt-4">
                                <Link to="cart.html" className="btn btn-dark btn-hover-primary rounded-0 w-100">View
                                    cart</Link>
                                <Link to="checkout.html"
                                      className="btn btn-dark btn-hover-primary rounded-0 w-100 mt-4">Checkout</Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default UserNavbar