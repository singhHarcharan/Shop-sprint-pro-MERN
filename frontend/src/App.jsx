import "./App.css";
import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {UserContext} from "./context/userContext.jsx";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout.jsx";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import SubCategory from "./pages/admin/SubCategory.jsx";
import AddProducts from "./pages/admin/AddProducts.jsx";
import PendingOrders from "./pages/admin/orders/PendingOrders.jsx";
import ShippedOrders from "./pages/admin/orders/ShippedOrders.jsx";
import DeliveredOrders from "./pages/admin/orders/DeliveredOrders.jsx";
import ChangePassword from "./pages/admin/ChangePassword";

// User
import UserDashboard from "./pages/user/UserDashboard.jsx";
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import UserChangePassword from "./pages/user/ChangePassword";

// Public
import Home from "./pages/user/Home.jsx";
import Shop from "./pages/public/Shop.jsx";
import About from "./pages/user/About.jsx";
import Products from "./pages/public/Products.jsx";
import ProductDescription from "./pages/public/ProductDescription.jsx";
import Contact from "./pages/user/Contact.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import PublicLogin from "./pages/user/PulicLogin.jsx";
import Wishlist from "./pages/user/Wishlist.jsx";
import Cart from "./pages/user/Cart.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import ThankYou from "./pages/public/ThankYou.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    async function ReadCartCount() {
        // console.log("****")
        let token = localStorage.getItem("userToken");
        if (!token) {
            setCartCount(0)
        } else {
            let url = "http://localhost:5000/cart-count";
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            response = await response.json();
            // console.log(response);
            if (response.error === "") {
                // console.log(response.record);
                setCart(response.record)
                setCartTotal(response.total)
                setCartCount(response.record.length)
            }
        }
    }

    useEffect(() => {
        ReadCartCount().then();
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{cartCount, setCartCount, ReadCartCount, cart, cartTotal}}>
                <Routes>

                    <Route path="/" element={<PublicLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="shop" element={<Shop/>}/>
                        <Route path="products" element={<Products/>}/>
                        <Route path="product-description" element={<ProductDescription/>}/>
                        <Route path="login-register" element={<PublicLogin/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="wishlist" element={<Wishlist/>}/>
                        <Route path="sign-up" element={<UserSignup/>}/>
                        <Route path="user-login" element={<UserLogin/>}/>
                        <Route path="admin-login" element={<AdminLogin/>}/>
                        <Route path="cart" element={<Cart/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="order-placed" element={<ThankYou/>}/>
                    </Route>

                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="category" element={<Category/>}/>
                        <Route path="subcategory" element={<SubCategory/>}/>
                        <Route path="products" element={<AddProducts/>}/>
                        <Route path="pending-orders" element={<PendingOrders/>}/>
                        <Route path="shipped-orders" element={<ShippedOrders/>}/>
                        <Route path="delivered-orders" element={<DeliveredOrders/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                    </Route>

                    <Route path="/user" element={<UserLayout/>}>
                        <Route path="dashboard" element={<UserDashboard/>}/>
                        <Route path="orders" element={<Orders/>}/>
                        <Route path="order-details" element={<OrderDetails/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="change-password" element={<UserChangePassword/>}/>
                    </Route>

                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
