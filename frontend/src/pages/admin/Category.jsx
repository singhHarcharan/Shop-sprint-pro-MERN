import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message"
import {useState, useEffect} from "react";
import BreadCrumb from "../../components/BreadCrumb.jsx";

function Category() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    async function onSubmit(data) {
        // console.log(data);
        let response = await fetch("http://localhost:5000/category", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        ReadCategory().then();
        if (response.error === "") {
            reset();
        }
    }

    const [category, setCategory] = useState([]);

    async function ReadCategory() {
        let url = "http://localhost:5000/category";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error != "") {
            alert(response.error);
        } else {
            setCategory(response.records);
        }
    }

    useEffect(() => {
        ReadCategory().then();
    }, []);

    async function DeleteCategory(id) {
        if (confirm('Are yop sure?')) {
            let url = `http://localhost:5000/category/${id}`;
            let response = await fetch(url, {method: "DELETE"});
            response = await response.json();
            console.log(response);
            ReadCategory().then();
        }
    }

    return (
        <>
            <BreadCrumb pageTitle="Manage Category"/>

            <div className="section section-margin">
                <div className="container">
                    <div className="row mb-n10 justify-content-center">
                        <div className="col-lg-6 col-md-8 m-auto m-lg-0 pb-10">
                            <div className="login-wrapper" style={{backgroundColor: '#E7E8E8'}}>
                                <h5 className="mb-2">Add New Category</h5>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control"
                                               {...register("categoryName", {required: "This Field is required."})}
                                        />

                                        <ErrorMessage errors={errors} name="categoryName"
                                                      render={({message}) => <p className="text-danger">{message}</p>}
                                        />
                                    </div>

                                    <div className="single-input-item">
                                        <button className="btn btn btn-dark btn-hover-primary rounded-0">
                                            Add Category
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div style={{marginTop: '3rem'}}>
                                <h5>List of Category</h5>
                                <table className="table table-bordered table-light">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category Name</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {category.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.CategoryName}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"
                                                        type="button"
                                                        onClick={() => DeleteCategory(value.id)}
                                                >
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
}

export default Category;
