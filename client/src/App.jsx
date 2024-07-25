import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main>
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default App;
