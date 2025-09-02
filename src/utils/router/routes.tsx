import React from "react";
import Home from "../../pages/Home";
import Products from "../../pages/Products";

const routerConfig = [
  {
    path: "/",
    element: <Home />,
    exact: true,
    protected: false,
  },
  {
    path: "/product",
    element: <Products />,
    exact: true,
    protected: false,
  },
];

export default routerConfig;
