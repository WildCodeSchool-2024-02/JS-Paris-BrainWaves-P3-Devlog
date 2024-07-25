import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Member from "./pages/Member/Member";
import Table from "./pages/Table/Table";
import { AuthProvider } from "./services/context";

import App from "./App";
import LoginPage from "./pages/Login/Login";

import SignupPage from "./pages/Signup/Signup";
import Archiveproject from "./components/Archiveproject/Archiveproject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/member",
        element: <Member />,
      },
      {
        path: "/table/:id",
        element: <Table />,
      },
      {
        path: "/archive",
        element: <Archiveproject />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
