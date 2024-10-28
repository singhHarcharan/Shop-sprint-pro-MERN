import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

const VerifyOTP = ({billId, setVerifiedHandler}) => {

    let {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    async function onSubmit(data) {
        data['id'] = billId;

        const token = localStorage.getItem("adminToken");
        let url = "http://localhost:5000/admin-verify-delivery-otp";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            // setVerifiedHandler(false);
            Qual.errordb(response.error, "Please Enter Valid OTP");
        } else {
            reset();
            setVerifiedHandler(true);
            Qual.successdb("Success", response.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="otp">Enter OTP</label>
                <input type="text" id="otp" className="form-control"
                       {...register("otp", {required: "This field is required"})}/>

                <ErrorMessage errors={errors} name="otp"
                              render={({message}) => <p className="text-danger">{message}</p>}
                />
            </div>

            <button className="btn btn-primary">Verify</button>
        </form>
    )
}
export default VerifyOTP