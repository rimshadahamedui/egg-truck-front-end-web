import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ roles }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated, role } = user;
  if (!isAuthenticated)
    return (
      <Navigate
        to={roles.includes("admin") ? "/admin/login" : "/login"}
        replace
      />
    );

  if (!roles.includes(role)) {
    return (
      <Navigate
        to={role === "user" ? "/" : "/admin/dashboard"}
        // state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated, role } = user;
  if (isAuthenticated)
    return <Navigate to={role === "user" ? "/" : "/admin/dashboard"} replace />;

  return <Outlet />;
};
