import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import PublicNavbar from "../components/PublicNavbar.jsx";
import UserFooter from "../components/UserFooter.jsx";


const UserLayout = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location.pathname]);

    return (
        <>
            <PublicNavbar/>
            <Outlet/>
            <UserFooter/>
        </>
    )
}
export default UserLayout