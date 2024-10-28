import UserNavbar from "../components/UserNavbar.jsx";
import PublicNavbar from "../components/PublicNavbar.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserFooter from "../components/UserFooter.jsx";

const UserLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("userToken") // null / token

        if (!token) {
            navigate("/user-login")
        }
        // else {
        //     console.log(token)
        // }
    });

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location.pathname]);

    return (
        <>
            {/*<UserNavbar/>*/}
            <PublicNavbar/>
            <Outlet/>
            <UserFooter/>
        </>
    )
}
export default UserLayout