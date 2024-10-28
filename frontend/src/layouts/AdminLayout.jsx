import {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import UserFooter from "../components/UserFooter"

function AdminLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("adminToken") // null / token

        if (!token) {
            navigate("/admin-login")
        }
        // else {
        //     console.log(token)
        // }
    });

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [location.pathname]);

    return (
        <>
            <AdminNavbar/>
            <Outlet/>
            <UserFooter/>
        </>
    );
}

export default AdminLayout;
