// ControlPanel.js
import React, { useState } from 'react';

const ControlPanel = ({ onDimensionsSubmit }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const handleSubmit = () => {
    if (length && width) {
      onDimensionsSubmit(Number(length), Number(width));
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
