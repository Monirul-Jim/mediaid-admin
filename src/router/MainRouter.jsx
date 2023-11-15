import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/customers/Customers";
import CustomerDetails from "../pages/customers/CustomerDetails";
import OrderList from "../pages/orders/OrderList";
import OrderDetails from "../pages/orders/OrderDetails";
import ProductList from "../pages/products/ProductList";
import ProductDetails from "../pages/products/ProductDetails";
import AddCategory from "../pages/AddCategory";
import Overview from "../pages/overview/Overview";
import BannerEdit from "../pages/BannerEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "banner-edit",
        element: <BannerEdit />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
      },
      {
        path: "orderList",
        element: <OrderList />,
      },
      {
        path: "orderList/:id",
        element: <OrderDetails />,
      },
      {
        path: "productList",
        element: <ProductList />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "productList/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
