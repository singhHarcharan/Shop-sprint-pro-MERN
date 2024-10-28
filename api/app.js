const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {verify} = require("jsonwebtoken");

app.use(express.static('public'))
app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userController = require("./controllers/user.controller")
const adminController = require("./controllers/admin.controller");

// const connection = require("./connection");

function adminAuthorization_HTTP_Request(req, res, next) {
    if (!req.body.token) {
        return res.json({error: "Unauthorized Access", message: ""});
    }

    let token = req.body.token;
    let secret = "abc@123";

    try {
        // verify token
        req["adminInfo"] = verify(token, secret); // return data
        next();
    } catch (error) {
        res.json({error: error.message, message: ""});
    }
}

function userAuthorization_HTTP_Request(req, res, next) {
    let token = req.body.token;
    if (!token) {
        return res.json({error: "Unauthorized Access", message: ""});
    }
    try {
        let secret = "abc@123";
        req.user = verify(token, secret);
        next();
    } catch (error) {
        res.json({error: error.message});
    }
}

function userAuthorization_GET_Request(req, res, next) {
    // console.log(req.headers)
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.json({error: 'Unauthorized Access'});
    }
    try {
        let secret = "abc@123";
        req.user = verify(token, secret);
        next();
    } catch (err) {
        return res.json({error: err.message});
    }
}

function adminAuthorization_GET_Request(req, res, next) {
    // console.log(req.headers)
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.json({error: 'Token Missing.'});
    }
    try {
        let secret = "abc@123";
        req.user = verify(token, secret);
        next();
    } catch (err) {
        return res.json({error: err.message});
    }
}

/* User */
app.post("/user-login", userController.UserSignIn);
app.post("/user-signup", userController.UserSignUp);
app.get("/my-orders", userAuthorization_GET_Request, userController.MyOrders);
app.post("/user-change-password", userAuthorization_HTTP_Request, userController.ChangePassword);

/* Admin */
app.post("/change-password", adminAuthorization_HTTP_Request, adminController.AdminChangePassword);
app.post("/adminLogin", adminController.AdminLogin);
app.post("/category", adminController.AddCategory);
app.post("/subcategory", adminController.AddSubCategory);
app.post("/addproducts", adminController.AddProducts);
app.post("/products-photo/:product_id", adminController.UploadPhoto)
app.get("/Category", adminController.ReadCategory);
app.get("/subcategory", adminController.ReadSubCategory);
app.get("/allproducts", adminController.ReadProducts);
app.delete("/Category/:id", adminController.DeleteCategory);
app.delete("/subcategory/:id", adminController.DeleteSubCategory);
app.delete("/allproducts/:id", adminController.DeleteProducts);
app.get("/admin-orders/:action", adminAuthorization_GET_Request, adminController.ReadOrders)
app.post("/admin-ship-order", adminAuthorization_GET_Request, adminController.ShipOrder)
app.post("/admin-send-delivery-otp", adminAuthorization_GET_Request, adminController.SendOTPForOrderDelivery)
app.post("/admin-verify-delivery-otp", adminAuthorization_GET_Request, adminController.VerifyOTPForOrderDelivery)
app.post("/admin-deliver-order", adminAuthorization_GET_Request, adminController.DeliverOrder)

/* Public */
app.get("/home-page-category", adminController.ReadHomePageCategory);
app.get("/home-page-products", adminController.ReadHomePageProducts);
app.get("/products/:sub_cat_id", adminController.ReadShopPageProducts);
app.get("/subcategory-by-category/:category_id", adminController.SubCategoryByCategory);
app.get("/add-to-cart/:pro_id", userAuthorization_GET_Request, userController.AddToCart)
app.get("/cart-count", userAuthorization_GET_Request, userController.CartCount)
app.post("/update-cart-quantity", userAuthorization_GET_Request, userController.UpdateQuantity)
app.get("/remove-from-cart/:cart_id", userAuthorization_GET_Request, userController.RemoveFromCart)
app.get("/checkout-data", userAuthorization_GET_Request, userController.CheckoutData)
app.post("/place-order", userAuthorization_GET_Request, userController.PlaceOrder)

const Port = 5000;
app.listen(Port, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Server is Running");
    }
});
