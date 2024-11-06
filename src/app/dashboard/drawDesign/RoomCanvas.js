"use client";

import React, { useEffect, useRef } from 'react';

const RoomCanvas = ({ roomDimensions, droppedItems, selectedItemId, onItemClick, onItemMove }) => {
  const canvasRef = useRef(null);
  const { length, width } = roomDimensions;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions based on room dimensions
    canvas.width = length * 10;
    canvas.height = width * 10;

    // Set light grey background
    context.fillStyle = '#d3d3d3';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each furniture item
    droppedItems.forEach((item) => {
      const image = new window.Image();
      image.src = item.image; // Path to the image file, e.g., '/dashboard/chair.png'

      image.onload = () => {
        context.drawImage(image, item.x, item.y, item.width, item.height);
        if (item.id === selectedItemId) {
          // Draw a border around the selected item
          context.strokeStyle = 'red';
          context.lineWidth = 3;
          context.strokeRect(item.x, item.y, item.width, item.height);
        }
      };
    });
  }, [length, width, droppedItems, selectedItemId]);

  const handleCanvasClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;

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
      style={{
        border: '3px solid #333', // Thicker border with custom color
        backgroundColor: '#f0f0f0',
        boxSizing: 'border-box' // Ensures padding does not affect canvas size
      }}
      onClick={handleCanvasClick}
      onMouseMove={(event) => {
        if (event.buttons === 1 && selectedItemId) {
          handleCanvasDrag(event);
        }
      }}
    />
  );
};

export default RoomCanvas;
