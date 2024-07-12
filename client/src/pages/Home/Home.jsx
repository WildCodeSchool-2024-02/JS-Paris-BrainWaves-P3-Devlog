import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManager";
import Project from "../../components/Project/project";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <p>Accueil</p>
      <TaskManager />
      <Project />
    </div>
  );
}

export default Home;
