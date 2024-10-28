import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <div className="col-xl-2 col-6">
            <div className="header-logo">
                <Link to="/" style={{fontSize: '1.5rem'}}>
                    {/* <img src="/assets/images/logo/logo.png" width="" alt="Site Logo"/> */}
                    ShopSprintPro
                </Link>
            </div>
        </div>
    )
}
export default Logo;