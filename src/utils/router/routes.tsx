import React from "react";
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import ProductDetails from "../../pages/ProductDetails";
import Cart from "../../pages/Cart";
import Favourite from "../../pages/Favourite";
import Checkout from "../../pages/Checkout";
import MyOrders from "../../pages/MyOrders";
import OrderDetails from "../../pages/OrderDetails";

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
    breadcrump: "shop",
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
    exact: true,
    protected: false,
    breadcrump: "Product Details",
  },
  {
    path: "/cart",
    element: <Cart />,
    exact: true,
    protected: false,
    breadcrump: "Cart",
  },
  {
    path: "/favorite",
    element: <Favourite />,
    exact: true,
    protected: false,
    breadcrump: "Favourite",
  },
  {
    path: "/checkout",
    element: <Checkout />,
    exact: true,
    protected: false,
    breadcrump: "Checkout",
  },
  {
    path: "/me/orders",
    element: <MyOrders />,
    exact: true,
    protected: false,
    breadcrump: "My Orders",
  },
  {
    path: "/me/orders/:id",
    element: <OrderDetails />,
    exact: true,
    protected: false,
    breadcrump: "My Orders",
  },
];

export default routerConfig;
