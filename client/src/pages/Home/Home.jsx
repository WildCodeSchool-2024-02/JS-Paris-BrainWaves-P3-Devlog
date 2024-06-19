import "./home.css";
import TaskManager from "../../components/TaskManager/TaskManger";

function Home() {
  return (
    <div className="home-page">
      <p>Accueil</p>
      <TaskManager />
    </div>
  );
}

export default Home;
