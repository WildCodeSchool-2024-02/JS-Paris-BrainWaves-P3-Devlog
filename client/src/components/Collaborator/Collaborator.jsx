import "./collaborator.css";
import { useState, useRef, useEffect } from "react";
import noname from "../../assets/images/noname.jpeg";

const initialCollab = [];

function Collaborator() {
  const [collab, setCollab] = useState(initialCollab);
  const [warning, setWarning] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [listHeight, setListHeight] = useState("2200px");

  const fetchDataUser = async () => {
    try {
      const response = await fetch("http://localhost:3311/api/user");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const receptionData = await response.json();
      setCollab(receptionData);
    } catch (error) {
      console.error("Error fetching dataUser", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const addNewUser = () => {
    const hasUpperCase = /[A-Z]/.test(newUser);
    if (
      newUser.trim().length < 10 ||
      newUser.trim().length > 15 ||
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
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 15) {
      setNewUser(event.target.value);
    }
  };

  const myUserList = collab.map((coll) => (
    <div className="collaborator-content-list " key={coll.id}>
      <div className="collaborator-figure">
        <img src={noname} alt="noname" className="collaborator-img" />
      </div>
      <div className="user-content">
        <li className="user-name">
          <div>{coll.name}</div>
        </li>
      </div>
    </div>
  ));

  return (
    <div className="collaborator-container">
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
