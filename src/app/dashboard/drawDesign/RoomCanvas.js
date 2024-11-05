// RoomCanvas.js
import React, { useEffect, useRef, useState } from 'react';
import { furnitureData } from './furnitureData';

const RoomCanvas = ({ roomDimensions }) => {
  const canvasRef = useRef(null);
  const { length, width } = roomDimensions;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions based on room dimensions
    canvas.width = length * 10;
    canvas.height = width * 10;

    // Fill the background color
    context.fillStyle = 'gray';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [length, width]);

  return (
    <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
  );
};

export default RoomCanvas;
