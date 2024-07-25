import { useState } from "react";
import PropTypes from "prop-types";
import "./popover.css";

function Popover({ onClose, onCreate }) {
  const [newProjectName, setNewProjectName] = useState('');

  const handleCreateClick = () => {
    if (newProjectName.trim()) {
      onCreate(newProjectName);
      setNewProjectName("");
    }
  };

  return (
    <div className="popover">
      <div className="popover-content">
        <input
          type="text"
          placeholder="Enter project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button type="button" onClick={handleCreateClick}>
          Create
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
Popover.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default Popover;
