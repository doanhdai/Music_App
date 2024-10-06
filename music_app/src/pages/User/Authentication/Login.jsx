import React, { Suspense } from "react";
import "../../../assets/css/auth_style.css";
import "../../../assets/css/base.css";
import { Outlet } from "react-router-dom";

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Login-container">
        <Outlet />
      </div>
    </Suspense>
  );
};

export default Login;
