"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import { furnitureData } from './furnitureData';

const RoomCanvas = dynamic(() => import('./RoomCanvas'), { ssr: false });

const DrawDesignPage = () => {
  const [roomDimensions, setRoomDimensions] = useState({ length: 0, width: 0 });
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]); // Track dropped items
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item

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

    // Add new item position to droppedItems, ensure it does not overlap
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`, // Unique ID
      x: offsetX,
      y: offsetY,
    };
    setDroppedItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemClick = (id) => {
    // Select an item to allow repositioning or deletion
    setSelectedItemId(id);
  };

  const handleItemMove = (id, newX, newY) => {
    // Move item to a new position on the canvas
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
      setSelectedItemId(null); // Deselect item after deletion
    }
  };

  return (
    <div>
      <h2>Room Designer</h2>
      <ControlPanel onDimensionsSubmit={handleStartDrawing} />
      {isCanvasVisible && (
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
          <button onClick={handleDeleteItem} disabled={!selectedItemId}>
            Delete Selected Item
          </button>
          <div style={{ marginTop: '20px' }}>
            {furnitureData.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{
                  width: item.width,
                  height: item.height,
                  backgroundColor: 'lightblue',
                  margin: '5px',
                  padding: '10px',
                  cursor: 'grab',
                  textAlign: 'center',
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawDesignPage;
