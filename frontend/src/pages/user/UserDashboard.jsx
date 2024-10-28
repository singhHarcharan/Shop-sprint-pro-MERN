import BreadCrumb from "../../components/BreadCrumb.jsx";

const UserDashboard = () => {
    return (
        <>
            <BreadCrumb pageTitle="Dashboard"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="section-title m-3 aos-init aos-animate"></div>

                    <div className="row">
                        <div className="col-12">
                            <div className="row shop_wrapper grid_4">
                                <h2 className="mb-0 text-center">Welcome User!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserDashboard