import PublicNavbar from "../components/PublicNavbar.jsx";
import UserFooter from "../components/UserFooter.jsx";
import BreadCrumb from "../components/BreadCrumb.jsx";

const PageNotFound = () => {
    return (
        <>
            <PublicNavbar/>
            <BreadCrumb pageTitle="Page Not Found"/>
            <div className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center py-5">
                            <img
                                src="https://img.freepik.com/premium-vector/404-error-with-icon-tab-wedsite-error_114341-27.jpg"
                                alt="Green Tick" className="page-not-found"/>
                        </div>
                    </div>
                </div>
            </div>
            <UserFooter/>
        </>
    )
}
export default PageNotFound;