import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.css";

function App() {
  return (
    <main>
    <section>
      <Header />
      <Outlet />
    </section>
    </main>
  );
}

export default App;
