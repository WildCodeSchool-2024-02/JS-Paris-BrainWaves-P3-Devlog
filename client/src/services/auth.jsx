import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthContext from "./context";

function BlockRoute() {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  useEffect(() => {
    async function block() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/refresh`,
          { method: "GET", credentials: "include" }
        );
        const token = response.headers.get("Authorization");
        const user = await response.json();
        user.token = token;
        setAuth({ isLogged: true, user, token });
      } catch (error) {
        toast.error("Une erreur est survenue");
        navigate("/login");
      }
    }

    block();
  });

  return <ToastContainer />;
}

export default BlockRoute;
