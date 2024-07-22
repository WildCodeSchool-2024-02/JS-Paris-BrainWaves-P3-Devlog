import React, { useState } from 'react';
import './popover.css';

const Popover = ({ onClose, onCreate }) => {
  const [newProjectName, setNewProjectName] = useState('');

  const handleCreateClick = () => {
    if (newProjectName.trim()) {
      onCreate(newProjectName);
      setNewProjectName('');
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
        <button onClick={handleCreateClick}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popover;
