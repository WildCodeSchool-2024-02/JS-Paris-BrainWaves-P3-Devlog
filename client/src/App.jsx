import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.css";

function App() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}

export default App;
