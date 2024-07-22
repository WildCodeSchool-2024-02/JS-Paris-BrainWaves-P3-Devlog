import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import useAuthContext from "./services/context";

function App() {
  const { setAuth } = useAuthContext();

  useEffect(() => {
    const getAuth = async () => {
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
      }
    };
    getAuth();
  }, [setAuth]);

  return (
    <main>
      <section>
        <ToastContainer />
        <Outlet />
      </section>
    </main>
  );
}

export default App;
