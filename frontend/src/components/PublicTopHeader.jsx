import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/userContext.jsx";

const PublicTopHeader = ({loggedIn, setLoggedIn}) => {
    const {setCartCount} = useContext(UserContext);
    const navigate = useNavigate();

    function UserLogout(e) {
        e.preventDefault();
        setCartCount(0);
        setLoggedIn(false);
        localStorage.removeItem("userToken");

        navigate("/user-login");
    }

    return (
        <div className="header-top py-2" style={{backgroundColor: '#E7E8E8'}}>
            <div className="container">
                <div className="row row-cols-xl-2 align-items-center">

                    <div className="col d-none d-lg-block">
                        <div className="header-top-lan-curr-link">
                            <div className="header-top-links">
                                {/*<Link to="/">*/}
                                    support@erina.com
                                {/*</Link>*/}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <p className="text-end">
                            {loggedIn ?
                                <>
                                    <Link to="/user/orders" style={{textDecoration: 'none'}}>My Orders</Link>

                                    {/*<Link to="/user/profile" style={{textDecoration: 'none'}} className="ms-3">*/}
                                    {/*    Profile*/}
                                    {/*</Link>*/}

                                    <Link to="/user/change-password" style={{textDecoration: 'none'}} className="ms-3">
                                        Change Password
                                    </Link>

                                    <Link to="/user/logout" style={{textDecoration: 'none'}}
                                          onClick={UserLogout} className="ms-3">
                                        Logout
                                    </Link>
                                </> :
                                <Link to="/sign-up" style={{textDecoration: 'none'}}>
                                    Create Account
                                </Link>
                            }
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PublicTopHeader;