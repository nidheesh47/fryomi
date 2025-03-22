import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import Cart from "../pages/User/Cart";
import Contact from "../pages/User/Contact";
import OrderDetails from "../../src/pages/User/OrderDetails";
import SearchPage from "../pages/User/SearchPage";
import Signup from "../pages/shared/Signup";
import Payment from "../pages/User/Payment";
import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/shared/ErrorPage";
import AllRestaurants from "../pages/User/AllRestaurants";
import RestaurantPage from "../pages/User/RestaurantPage";
import RatingPage from "../pages/User/Rating";
import LoginPage from "../pages/shared/Login";
import CheckoutPage from "../pages/User/CheckoutPage/CheckoutPage";
import ReviewPage from "../pages/User/ReviewPage";
import { ProtectedRoute } from "./ProtectedRoute";
import ProfilePage from "../pages/User/Profile/Profile";
import Invoice from "../pages/User/CheckoutPage/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "loginPage",
        element: <LoginPage  />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "all-restuarant",
        element: <AllRestaurants />,
      },
      {
        path: "restaurantPage/:id",
        element: <RestaurantPage />,
      },
      {
        path:"review/:id",
        element:<ReviewPage />
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        element:<ProtectedRoute />,
        path:"/",
        children:[
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "order",
            element: <OrderDetails />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path:"checkout",
            element:<CheckoutPage />
          },
          {
            path:"invoice/:orderId",
            element:<Invoice />
          },
         
        ]
      }
    ],
  },
  // {
  //   path: "admin",
  //   element: <AdminLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "",
  //       element: <Home />,
  //     },
  //     {
  //       path: "signup",
  //       element: <Signup />,
  //     },
  //     {
  //       path: "loginPage",
  //       element: <LoginPage role="admin"  />,
  //     },
  //     {
  //       path: "about",
  //       element: <About />,
  //     },
  //     {
  //       path: "all-restuarant",
  //       element: <AllRestaurants />,
  //     },
  //     {
  //       path: "restaurantPage/:id",
  //       element: <RestaurantPage />,
  //     },
  //     {
  //       path:"review/:id",
  //       element:<ReviewPage />
  //     },
  //     {
  //       path: "payment",
  //       element: <Payment />,
  //     },
  //     {
  //       element:<ProtectedRoute />,
  //       path:"/",
  //       children:[
  //         {
  //           path: "cart",
  //           element: <Cart />,
  //         },
  //         {
  //           path: "order",
  //           element: <OrderDetails />,
  //         },
  //         {
  //           path: "profile",
  //           element: <ProfilePage />,
  //         },
  //         {
  //           path: "contact",
  //           element: <Contact />,
  //         },
  //         {
  //           path:"checkout",
  //           element:<CheckoutPage />
  //         },
         
  //       ]
  //     }
  //   ],
  // },
  
]);

export default router;
