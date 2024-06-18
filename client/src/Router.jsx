import { createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Archive from "./pages/Archive/Archive";
import Member from "./pages/Member/Menber";
import Table from "./pages/Table/Table";

const router = createBrowserRouter([
     {
          path: "/",
          element: <Welcome />,
     },
     {
          path: "/home",
          element: <Home />
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
]);

export default router;
