import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./home.css";

function Home() {
  return (
    <div id="home">
      <Outlet />
      <Nav />
    </div>
  );
}

export default Home;
