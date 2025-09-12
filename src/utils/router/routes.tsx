import Home from "../../pages/Home";
import Products from "../../pages/Products";
import ProductDetails from "../../pages/ProductDetails";
import Cart from "../../pages/Cart";
import Favourite from "../../pages/Favourite";
import Checkout from "../../pages/Checkout";
import MyOrders from "../../pages/MyOrders";
import OrderDetails from "../../pages/OrderDetails";
import AdminProducts from "../../pages/AdminProducts";
import UpdateProduct from "../../pages/UpdateProduct";
import Category from "../../pages/Category";
import Profile from "../../pages/Profile";

const routerConfig = [
  {
    path: "/admin/products",
    element: <AdminProducts />,
    exact: true,
    protected: true,
    breadcrump: "Admin Products",
  },
  {
    path: "/admin/products/:id/edit",
    element: <UpdateProduct />,
    exact: true,
    protected: true,
    breadcrump: "Update Product",
  },
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
  {
    path: "/admin/categories",
    element: <Category />,
    exact: true,
    protected: false,
    breadcrump: "Categories",
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: true,
    protected: true,
    breadcrump: "Profile",
  },
];

export default routerConfig;
