import {Link, useNavigate} from "react-router-dom";
import Logo from "./Logo.jsx";

function AdminNavbar() {

    const navigate = useNavigate();

    function AdminLogout(e) {
        e.preventDefault();
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
    }

    return (
        <div className="header section">
            <div className="header-bottom">
                <div className="header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <Logo/>

                            <div className="col-xl-8 d-none d-xl-block">
                                <div className="main-menu position-relative">
                                    <ul>

                                        <li className="has-children">
                                            <Link to="/admin/dashboard">
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/admin/category">
                                                <span>Category</span>
                                            </Link>
                                        </li>

                                        <li className="has-children position-static">
                                            <Link to="/admin/subcategory">
                                                <span>SubCategory</span>
                                            </Link>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/admin/products">
                                                <span>Products</span>
                                            </Link>
                                        </li>

                                        <li className="has-children">
                                            <Link to="#">
                                                <span>Orders</span>{" "}
                                                <i className="fa fa-angle-down"></i>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/admin/pending-orders">Pending Orders</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/shipped-orders">Shipped Orders</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/delivered-orders">Delivered Orders</Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="has-children">
                                            <Link to="#">
                                                <span>Settings</span>{" "}
                                                <i className="fa fa-angle-down"></i>
                                            </Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/admin/change-password">Change Password</Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/logout" onClick={AdminLogout}>Logout</Link>
                                                </li>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
