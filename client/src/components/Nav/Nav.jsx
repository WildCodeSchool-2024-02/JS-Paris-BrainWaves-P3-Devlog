import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import "./nav.css";

const fetchTables = async () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "DEV_LOG", color: "pink" },
        { id: 2, name: "Tableau 2", color: "purple" },
        { id: 3, name: "Tableau 3", color: "green" },
        { id: 4, name: "Tableau 4", color: "blue" },
      ]);
    }, 1000);
  });

function Nav() {
  const [isOpen, setIsOpen] = useState(true);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTables = async () => {
      const data = await fetchTables();
      setTables(data);
    };

    getTables();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const deleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  return (
    <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="header">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <RiArrowLeftSFill /> : <RiArrowRightSFill />}
        </button>
      </div>
      <div className="content">
        <Link to="/Member" className="team-btn">Consulter l'équipe</Link>
        <div className="boards">
          <p className="boards-title">Vos Tableaux</p>
          {tables.map((table) => (
            <div className="board" key={table.id}>
              <span className={`board-icon ${table.color}`} />
              <p className="board-name">{table.name}</p>
              <button
                type="button"
                className="delete-board"
                onClick={() => deleteTable(table.id)}
                aria-label={`Delete ${table.name}`}
              >
                <FiArchive />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="archive-section">
        <Link to="/archive" className="archive-btn">
          ARCHIVE
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
