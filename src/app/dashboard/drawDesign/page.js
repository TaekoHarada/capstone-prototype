"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';
import { furnitureData } from './furnitureData';

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
      <h2>Room Designer</h2>
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
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            {furnitureData.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{
                  width: item.width,
                  height: item.height,
                  backgroundColor: 'lightblue',
                  padding: '10px',
                  cursor: 'grab',
                  textAlign: 'center',
                }}
              >
                {item.name}
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
          <button onClick={handleDeleteItem} disabled={!selectedItemId} style={{ marginTop: '10px' }}>
            Delete Selected Item
          </button>
        </div>
      )}
    </div>
  );
};

export default DrawDesignPage;
