import "./collaborator.css";
import { useState, useRef, useEffect } from "react";
import avatar from "../../assets/images/avatar.jpg";
import useAuthContext from "../../services/context";

const initialCollab = [];

function Collaborator() {
  const [collab, setCollab] = useState(initialCollab);
  const [warning, setWarning] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [listHeight, setListHeight] = useState("2200px");
  const { auth } = useAuthContext();

  const fetchDataUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      setCollab([]);
    } catch (error) {
      console.error("Error fetching dataUser", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const addNewUser = () => {
    const hasUpperCase = /[A-Z]/.test(newUser);
    if (
      newUser.trim().length < 5 ||
      newUser.trim().length > 12 ||
      !hasUpperCase
    ) {
      setWarning(true);
      return;
    }
    setWarning(false);
    const newId = collab.length ? collab[collab.length - 1].id + 1 : 1;
    setCollab([...collab, { id: newId, name: newUser }]);
    setNewUser("");
    setShowInput(false);

    if (listRef.current.scrollHeight > listRef.current.clientHeight) {
      setListHeight(`${listRef.current.scrollHeight}px`);
    }
  };

  const handleAddButtonClick = () => {
    setShowInput(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addNewUser();
    } else if (event.key === "Escape") {
      setShowInput(false);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 12) {
      setNewUser(event.target.value);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const myUserList = collab.map((coll) => (
    <div className="collaborator-content-list " key={coll.id}>
      <div className="collaborator-figure">
        <img src={avatar} alt="avatar" className="collaborator-img" />
      </div>
      <div className="user-content">
        <div className="user-name">
          <div>{coll.name}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="collaborator-container" ref={containerRef}>
      <div className="collaborator-title">
        <h1>Collaborateurs</h1>
      </div>
      <div
        className="collaborator-list"
        style={{ maxHeight: listHeight }}
        ref={listRef}
      >
        {myUserList}
      </div>
      {warning && (
        <p style={{ color: "red" }}>Veuillez entrer un nom valide .</p>
      )}

      {showInput && (
        <input
          className="collaborator-input-add"
          type="text"
          ref={inputRef}
          value={newUser}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Nouveau collaborateur..."
        />
      )}

      <div className="collaborator-button">
        <button
          className="collaborator-button-add"
          type="button"
          onClick={() => (showInput ? addNewUser() : handleAddButtonClick())}
        >
          INVITER
        </button>
      </div>
    </div>
  );
}

export default Collaborator;
