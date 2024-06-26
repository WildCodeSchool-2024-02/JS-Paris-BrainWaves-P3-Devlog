import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/Home";
import Archive from "./pages/Archive/Archive";
import Member from "./pages/Member/Member";
import Table from "./pages/Table/Table";

import App from "./App";
import Collaborater from "./components/Collaborater/Collaborater";
import Footer from "./components/Footer/Footer";
import Welcome from "./pages/Welcome/Welcome";

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
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/member",
        element: <Member />,
      },
      {
        path: "/table",
        element: <Table />,
      },
    ],
  },
  {
    path: "/Collabo",
    element: <Collaborater />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
