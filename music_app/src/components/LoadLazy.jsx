import React, { Suspense } from "react";
import { Spin } from "antd";

const LoadLazy = ({ children }) => {
  return <Suspense fallback={<Spin size="large" />}>{children}</Suspense>;
};

export default LoadLazy;
