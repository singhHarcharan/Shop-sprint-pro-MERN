import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import {useState, useEffect, useRef} from "react";
import BreadCrumb from "../../components/BreadCrumb";

const AddProducts = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const [subcategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    async function ReadProducts() {
        let url = "http://localhost:5000/allproducts";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setProducts(response.records);
        }
    }

    async function ReadCategory() {
        let url = "http://localhost:5000/category";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setCategories(response.records);
        }
    }

    async function ReadSubCategory(e) {
        let category_id = e.target.value;
        let url = "http://localhost:5000/subcategory-by-category/" + category_id;
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setSubCategories(response.records);
        }
    }

    useEffect(() => {
        ReadCategory();
        ReadProducts();
        // ReadSubCategory();
    }, []);

    async function onSubmit(data) {
        // console.log(data);
        // return false;

        let url = "http://localhost:5000/addproducts";

        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            Qual.errordb("Error", response.error);
            // console.log(error.message)
        } else {
            reset();
            ReadProducts();
            Qual.successdb("Success", response.message);
        }
    }

    async function DeleteProducts(id) {
        let url = `http://localhost:5000/allproducts/${id}`;
        let response = await fetch(url, {method: "DELETE"});
        response = await response.json();
        // console.log(response);
        // ReadCategory();
        if (response.error != "") {
            alert("Error", error.message);
            // console.log(error.message)
        } else {
            reset();
            ReadProducts();
            Qual.successdb("Success", response.message);
        }
    }

    const [productId, setProductId] = useState("");
    let fileRef = useRef(null);

    async function UploadPhoto() {
        if (!fileRef.current.files[0]) {
            Qual.errordb("Error", "Please Select Photo.");
            return false;
        }

        let formData = new FormData();
        formData.append("photo", fileRef.current.files[0]);

        let url = `http://localhost:5000/products-photo/${productId}`;
        let res = await fetch(url, {
            method: "POST",
            body: formData,
        });
        res = await res.json();
        console.log(res);

        ReadProducts();
    }

    return (
        <>
            <BreadCrumb pageTitle={"Manage Products"}/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <h5 className="mb-2">Add Products</h5>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="mb-4 col-md-6">
                                            <select className="form-select"
                                                    {...register("category", {
                                                        required: "This field is required",
                                                    })}
                                                    onChange={ReadSubCategory}>
                                                <option value="">Select Category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.id}>
                                                        {category.CategoryName}
                                                    </option>
                                                ))}
                                            </select>

                                            <ErrorMessage
                                                errors={errors}
                                                name="category"
                                                render={({message}) => <p className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-6">
                                            <select className="form-select"
                                                    {...register("subCategory", {
                                                        required: "This field is required",
                                                    })}>
                                                <option value="">Select SubCategory</option>
                                                {subcategories.map((subcategory, index) => (
                                                    <option key={index} value={subcategory.id}>
                                                        {subcategory.sub_cat}
                                                    </option>
                                                ))}
                                            </select>

                                            <ErrorMessage
                                                errors={errors}
                                                name="subCategory"
                                                render={({message}) => <p className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text" placeholder="abc" id="floatinginput"
                                                    className="form-control"
                                                    {...register("name", {
                                                        required: "This field is required",
                                                    })}
                                                />
                                                <label htmlFor="floatinginput">Product Name</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="name"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-6">
                                            <div className="form-floating">
                                                <input placeholder="abc" id="floatinginput" className="form-control"
                                                       type="text"
                                                       {...register("color", {
                                                           required: "This field is required",
                                                       })}
                                                />
                                                <label htmlFor="floatinginput">Product Colour</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="color"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-4">
                                            <div className="form-floating">
                                                <input placeholder="abc" id="floatinginput" className="form-control"
                                                       type="number" min={0}
                                                       {...register("price", {
                                                           required: "This field is required",
                                                       })}
                                                />
                                                <label htmlFor="floatinginput">Price</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="price"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-4">
                                            <div className="form-floating">
                                                <input placeholder="" id="discount"
                                                       className="form-control" type="number" min={0}
                                                       {...register("discount", {required: "This field is required",})}
                                                />
                                                <label htmlFor="discount">Discount (%)</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="discount"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-4">
                                            <div className="form-floating">
                                                <input placeholder="abc" id="floatinginput" className="form-control"
                                                       type="text"
                                                       {...register("size", {
                                                           required: "This field is required",
                                                       })}
                                                />
                                                <label htmlFor="floatinginput">Product Size</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="size"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>

                                        <div className="mb-4 col-md-12">
                                            <div className="form-floating">
                                                <textarea placeholder="" id="floatinginput"
                                                       className="form-control"
                                                       {...register("description", {required: "This field is required",})}
                                                />
                                                <label htmlFor="floatinginput">Description</label>
                                            </div>

                                            <ErrorMessage errors={errors} name="description"
                                                          render={({message}) => <p
                                                              className="text-danger">{message}</p>}
                                            />
                                        </div>
                                    </div>

                                    <button className="btn btn-dark btn-hover-primary rounded-0">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        <table className="table table-bordered table-light">
                            <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Product Name</th>
                                <th>Photo</th>
                                <th>Colour</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((value, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* <td>{value.pro_id}</td> */}
                                    <td>{value.pro_name}</td>
                                    <td>
                                        {!value.photo ? (
                                            <button
                                                type="button"
                                                onClick={() => setProductId(value.pro_id)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Upload Photo
                                            </button>
                                        ) : (
                                            <img
                                                src={"http://localhost:5000" + value.photo}
                                                alt=""
                                                style={{width: "50px"}}
                                            />
                                        )}
                                    </td>
                                    <td>{value.color}</td>
                                    <td>{value.price}</td>
                                    <td>{value.size}</td>
                                    <td>{value.sub_cat}</td>
                                    <td>{value.CategoryName}</td>
                                    <td>
                                        <button
                                            type="button" className="btn btn-danger btn-sm"
                                            onClick={() => DeleteProducts(value.pro_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal fade" id="exampleModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Upload Photo
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <input type="file" ref={fileRef} className="form-control"/>
                                        <button
                                            type="button"
                                            onClick={UploadPhoto}
                                            className="btn btn-primary mt-3"
                                        >
                                            Upload
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProducts;
