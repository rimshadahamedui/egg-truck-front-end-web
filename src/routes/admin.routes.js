import AdminLoginPage from "../pages/AdminPages/Login";
import Category from "../pages/AdminPages/category";
import Offers from "../pages/AdminPages/Offer";
import Orders from "../pages/AdminPages/Orders";
import Products from "../pages/AdminPages/Products";
import App from "../App";
import BannerManagement from "../pages/AdminPages/Banners";
import { ProtectedRoute, PublicRoute } from "./ProtectedRoute";
import OrderDetailPage from "../pages/AdminPages/Orders/OrderDetailPage";
import Feedback from "../pages/AdminPages/Feedback";
import Users from "../pages/AdminPages/users";
import Dashboard from "../pages/AdminPages/Dashboard";
import AdminLayout from "../pages/Layout/AdminLayout";
import { Navigate } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Theme from "../components/AdminComponents/Theme";

const adminRoutes = {
  path: "/admin/",
  element: <App isAdmin={true} />,
  children: [
    // Admin Protected routes
    {
      path: "",
      element: <ProtectedRoute roles={["admin"]} />,
      children: [
        {
          path: "",
          element: (
            <ChakraProvider theme={Theme}>
              <ColorModeScript initialColorMode={Theme} />
              <AdminLayout />
            </ChakraProvider>
          ),
          children: [
            { path: "", element: <Navigate to="/admin/dashboard" /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "banners", element: <BannerManagement /> },
            { path: "orders", element: <Orders /> },
            { path: "orders/:orderId", element: <OrderDetailPage /> },
            { path: "products", element: <Products /> },
            { path: "reviews/:productId", element: <Feedback /> },
            { path: "categories", element: <Category /> },
            { path: "offers", element: <Offers /> },
            { path: "users", element: <Users /> },
          ],
        },
      ],
    },
    // Admin Public routes
    {
      path: "",
      element: <PublicRoute />,
      children: [{ path: "login", element: <AdminLoginPage /> }],
    },
  ],
};

export default adminRoutes;
