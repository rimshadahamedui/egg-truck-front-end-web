import React from "react";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/Error/404Page";

const routes = createBrowserRouter([
  userRoutes,
  adminRoutes,
  { path: "*", element: <NotFoundPage /> },
]);

export default routes;
