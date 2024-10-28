const BreadCrumb = ({pageTitle}) => {
    return (
        <div className="section" style={{backgroundColor: '#E7E8E8'}}>
            <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="breadcrumb-content text-center">
                        <h1 className="title">{pageTitle}</h1>
                        <ul>
                            {/*<li>*/}
                            {/*    <a href="index.html">Home </a>*/}
                            {/*</li>*/}
                            {/*<li className="active"> Login | Register</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BreadCrumb;