import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import {useState, useEffect} from "react";
import BreadCrumb from "../../components/BreadCrumb";

const SubCategory = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

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
        // console.log(e.target.value);
        // let category_id = e.target.value;

        let url = "http://localhost:5000/subcategory";
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
        ReadSubCategory();
    }, []);

    async function DeleteSubCategory(id) {
        if (confirm('Are you sure')) {
            let url = `http://localhost:5000/subcategory/${id}`;
            let response = await fetch(url, {method: "DELETE"});
            response = await response.json();

            if (response.error !== "") {
                Qual.errordb("Error", response.error);
            } else {
                reset();
                ReadSubCategory().then();
                Qual.successdb("Success", response.message);
            }
        }
    }

    async function onSubmit(data) {
        let url = "http://localhost:5000/subcategory";

        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();

        if (response.error !== "") {
            alert("Error", error.message);
            // console.log(error.message)
        } else {
            reset();
            ReadSubCategory();
            Qual.successdb("Success", response.message);
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Manage Subcategory"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <h5 className="">Add New Subcategory</h5>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <select className="form-select"
                                                {...register("categoryname", {required: "This field is required",})}>
                                            <option value="">Select Category</option>

                                            {categories.map((category, index) => (
                                                <option key={index} value={category.id}>
                                                    {category.CategoryName}
                                                </option>
                                            ))}
                                        </select>

                                        <ErrorMessage
                                            errors={errors}
                                            name="categoryname"
                                            render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="text" placeholder="abc"
                                               id="floatinginput" className="form-control"
                                               {...register("SubCategory", {required: "This field is required",})}
                                        />
                                        <label htmlFor="floatinginput">Enter Subcategory</label>

                                        <ErrorMessage
                                            errors={errors}
                                            name="SubCategory"
                                            render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="single-input-item">
                                        <button className="btn btn btn-dark btn-hover-primary rounded-0">Submit</button>
                                    </div>
                                </form>
                            </div>

                            <div style={{marginTop: '3rem'}}>
                                <h5>List of Subcategory</h5>
                                <table className="table table-bordered table-light">
                                    <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Sub Category</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {subCategories.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.sub_cat}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm"
                                                        onClick={() => DeleteSubCategory(value.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategory;
