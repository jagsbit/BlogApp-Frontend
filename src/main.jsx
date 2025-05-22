import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import More from "./components/More.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UserDashBoard from "./components/user-routes/UserDashBoard.jsx";
import Profile from "./components/user-routes/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AddPost from "./components/user-routes/AddPost.jsx";
import { getAllPosts } from "./services/post-service.js";
import SinglePost from "./components/user-routes/SinglePost.jsx";
import CategoryWisePost from "./components/user-routes/CategoryWisePost.jsx";
import UpdatePost from "./components/user-routes/UpdatePost.jsx";
 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "more",
        element: <More />,
      },
      {
        path: "private",
        element: <PrivateRoute />,
        children: [
          {
            path: "user-dash",
            element: <UserDashBoard />,
          },
          {
            path: "user-profile", // <--- for logged-in user
            element: <Profile />,
          },
          {
            path: "user-profile/:userId", // <--- for public profile
            element: <Profile />,
          },
          {
            path: "add-post",
            element: <AddPost />,
          },
          {
            path: "posts/:postId",
            element: <SinglePost />,
          },
          {
            path: "category/:catId",
            element: <CategoryWisePost />,
          },
          {
            path: "update-post/:postId",
            element: <UpdatePost />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
