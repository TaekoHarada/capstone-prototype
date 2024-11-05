// RoomCanvas.js
import React, { useEffect, useRef } from 'react';

const RoomCanvas = ({ roomDimensions, droppedItems, selectedItemId, onItemClick, onItemMove }) => {
  const canvasRef = useRef(null);
  const { length, width } = roomDimensions;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = length * 10;
    canvas.height = width * 10;

    // Draw room background
    context.fillStyle = 'gray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each dropped item
    droppedItems.forEach((item) => {
      context.fillStyle = item.id === selectedItemId ? 'lightcoral' : 'lightblue';
      context.fillRect(item.x, item.y, item.width, item.height);
      context.fillStyle = 'black';
      context.fillText(item.name, item.x + 5, item.y + 15);
    });
  }, [length, width, droppedItems, selectedItemId]);

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    // Detect if an item was clicked based on coordinates
    const clickedItem = droppedItems.find(
      (item) =>
        offsetX >= item.x &&
        offsetX <= item.x + item.width &&
        offsetY >= item.y &&
        offsetY <= item.y + item.height
    );

    if (clickedItem) {
      onItemClick(clickedItem.id);
    } else {
      onItemClick(null);
    }
  };

  const handleCanvasDrag = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

    if (selectedItemId) {
      onItemMove(selectedItemId, offsetX, offsetY);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black' }}
      onClick={handleCanvasClick}
      onMouseMove={(event) => {
        if (event.buttons === 1 && selectedItemId) {
          handleCanvasDrag(event); // Move item while dragging
        }
      }}
    />
  );
};

export default RoomCanvas;
