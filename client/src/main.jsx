import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home/Home";
import Archive from "./pages/Archive/Archive";
import Menber from "./pages/Menber/Menber";
import Tableau from "./pages/Tableau/Tableau";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/menber",
        element: <Menber />,
      },
      {
        path: "/tableau",
        element: <Tableau />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
