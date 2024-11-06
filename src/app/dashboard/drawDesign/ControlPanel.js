// ControlPanel.js
import React, { useState } from 'react';

const ControlPanel = ({ onDimensionsSubmit }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const handleSubmit = () => {
    if (length && width) {
      onDimensionsSubmit(Number(length), Number(width));
    } else {
      console.log("Please enter valid room dimensions.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
      <input
        type="number"
        placeholder="Room Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '1em',
          width: '150px',
        }}
      />
      <input
        type="number"
        placeholder="Room Width"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '1em',
          width: '150px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
        }}
      >
        Create Room
      </button>
    </div>
  );
};

export default ControlPanel;
