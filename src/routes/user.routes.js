import LoginPage from "../pages/UserPages/Login/index";
import OTPPage from "../pages/UserPages/OTP";
import Homepage from "../pages/UserPages/Home";
import ShopPage from "../pages/UserPages/Shop";
import ProductPage from "../pages/UserPages/Product";
import CheckoutPage from "../pages/UserPages/CheckOut";
import CartPage from "../pages/UserPages/Cart";
import App from "../App";
import ProfilePage from "../pages/UserPages/Profile";
import WishlistPage from "../pages/UserPages/Wishlist";
import OrdersPage from "../pages/UserPages/Orders";
import AddressPage from "../pages/UserPages/Addresses";
import RegisterPage from "../pages/UserPages/Register";
import OrderDetailPage from "../pages/UserPages/Orders/OrderDetailPage";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
import Payment from "../pages/UserPages/Payment";
import ForgotPassword from "../pages/UserPages/ForgotPassword";
import SetNewPassword from "../pages/UserPages/ForgotPassword/SetNewPassword";
import Aboutus from "../pages/UserPages/Aboutus";
import Ecosystem from "../pages/UserPages/Ecosystem";
import AiFeatures from "../pages/UserPages/AiFeatures";

const userRoutes = {
  path: "/",
  element: <App />,

  children: [
    { path: "/", element: <Homepage /> },
    {
      path: "shop",
      element: <ShopPage />,
    },
    {
      path: "product/:productId",
      element: <ProductPage />,
    },
    // user Protected routes
    {
      path: "/",
      element: <ProtectedRoute roles={["user"]} />,
      children: [
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "wishlist",
          element: <WishlistPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "orders/:orderId",
          element: <OrderDetailPage />,
        },
        {
          path: "address",
          element: <AddressPage />,
        },

        {
          path: "order-confirmation/:orderId",
          element: <Payment />,
        },

        {
          path: "about",
          element: <Aboutus />,
        },
        {
          path: "ourecosystem",
          element: <Ecosystem/>,
        },
        {
          path: "ai",
          element: <AiFeatures/>,
        },
      ],
    },
    // User Public routes, can access only without LoggedIn
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "otp",
          element: <OTPPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset/:token",
          element: <SetNewPassword />,
        },
      ],
    },
  ],
};

export default userRoutes;
