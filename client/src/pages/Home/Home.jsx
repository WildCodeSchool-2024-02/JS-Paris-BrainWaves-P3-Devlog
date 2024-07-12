import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import Collaborator from "../../components/Collaborator/Collaborator";

function Home() {
  return (
    <div className="home-page">
      <p>Accueil</p>
      <TaskManager />
      <Project />
      <Collaborator/>
    </div>
  );
}

export default Home;
