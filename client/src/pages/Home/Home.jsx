import "./home.css";
<<<<<< TaskManager-Home
import TaskManager from "../../components/TaskManager/TaskManger";

function Home() {
  return (
    <div className="home-page">
      <TaskManager />
=======
import Project from "../../components/Project/project";

function Home() {
  return (
    <div>
      <p>Accueil</p>
      <Project />
>>>>>> dev
    </div>
  );
}

export default Home;
