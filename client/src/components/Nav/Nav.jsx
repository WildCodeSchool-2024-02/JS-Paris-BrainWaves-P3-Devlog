import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import { FiArchive } from "react-icons/fi";
import "./nav.css";
import useAuthContext from "../../services/context";

function Nav() {
  const { auth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchDataProject = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const receptionData = await response.json();

        setTables(receptionData.filter((elem) => elem.is_archived !== 1));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataProject();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const deleteTable = async (id) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/archive/${id}/1`,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
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
        <Link to="/Member" className="team-btn">
          Consulter l'équipe
        </Link>
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
