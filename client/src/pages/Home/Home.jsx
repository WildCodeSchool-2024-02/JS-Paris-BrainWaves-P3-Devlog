import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";

function Home() {
  return (
    <div className="home-page">
      <p>Accueil</p>
      <TaskManager />
      <Project />
    </div>
  );
}

export default Home;
