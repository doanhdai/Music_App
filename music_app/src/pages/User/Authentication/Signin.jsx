import React, { Suspense } from "react";
import "../../../assets/css/auth_style.css";
import "../../../assets/css/base.css";
import { Outlet } from "react-router-dom";

const Signin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Signin-container">
        <Outlet />
      </div>
    </Suspense>
  );
};

export default Signin;
