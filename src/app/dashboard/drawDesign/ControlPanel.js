// ControlPanel.js
import React, { useState } from 'react';

const ControlPanel = ({ onDimensionsSubmit }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const handleSubmit = () => {
    // Ensure length and width are valid before submitting
    if (length && width) {
      onDimensionsSubmit(Number(length), Number(width));
    } else {
      console.log("Please enter valid room dimensions.");
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Room Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <input
        type="number"
        placeholder="Room Width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Room</button>
    </div>
  );
};

export default ControlPanel;
