"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import { furnitureData } from './furnitureData';

// Dynamically import RoomCanvas with SSR disabled
const RoomCanvas = dynamic(() => import('./RoomCanvas'), { ssr: false });

const DrawDesignPage = () => {
  const [roomDimensions, setRoomDimensions] = useState({ length: 0, width: 0 });
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleStartDrawing = (length, width) => {
    setRoomDimensions({ length, width });
    setIsCanvasVisible(true);
  };

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('item', JSON.stringify(item));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    const item = JSON.parse(event.dataTransfer.getData('item'));

    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      x: offsetX,
      y: offsetY,
    };
    setDroppedItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };

  const handleItemMove = (id, newX, newY) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  const handleDeleteItem = () => {
    if (selectedItemId) {
      setDroppedItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItemId)
      );
      setSelectedItemId(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <h2 style={{ fontSize: '2em', fontWeight: 'bold', color: '#4A90E2', marginBottom: '10px' }}>
        Room Designer
      </h2>
      <ControlPanel onDimensionsSubmit={handleStartDrawing} />
      {isCanvasVisible && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          {/* Display draggable items as images */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            {furnitureData.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{
                  width: item.width,
                  height: item.height,
                  cursor: 'grab',
                  textAlign: 'center',
                }}
              >
                {/* Use the item's image instead of a colored rectangle */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
                <p style={{ fontSize: '0.9em', marginTop: '5px', color: '#555' }}>{item.name}</p>
              </div>
            ))}
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{ position: 'relative' }}
          >
            <RoomCanvas
              roomDimensions={roomDimensions}
              droppedItems={droppedItems}
              selectedItemId={selectedItemId}
              onItemClick={handleItemClick}
              onItemMove={handleItemMove}
            />
          </div>
          <button
            onClick={handleDeleteItem}
            disabled={!selectedItemId}
            style={{
              marginTop: '15px',
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              opacity: selectedItemId ? 1 : 0.6,
            }}
          >
            Delete Selected Item
          </button>
        </div>
      )}
    </div>
  );
};

export default DrawDesignPage;


// References
// ChatGPT
// Prompts:
// 1. "I want to create a full room designer app in React with draggable furniture items, how do I start?"
// 2. "How can I set up drag-and-drop functionality for furniture items in React?"
// 3. "How can I dynamically create a canvas in React where users can place furniture items and adjust room dimensions?"
