import { createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";

const router = createBrowserRouter([
     {
          path: "/",
          element: <Welcome />,
     },
]);

export default router;
