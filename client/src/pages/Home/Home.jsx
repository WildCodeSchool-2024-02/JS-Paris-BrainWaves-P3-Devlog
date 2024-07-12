import { useNavigate } from "react-router-dom";
import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import useAuthContext from "../../services/context/index";

function Home() {

  const {auth} = useAuthContext();
  const navigate = useNavigate();

  if(auth != null && auth.isLogged === false){
    navigate("/login");
  }

  return (
    <div className="home-page">
      <p>Accueil</p>
      <TaskManager />
      <Project />
    </div>
  );
}

export default Home;
