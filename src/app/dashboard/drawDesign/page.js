// page.js

"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ControlPanel from './ControlPanel';

// Dynamically import RoomCanvas with SSR disabled
const RoomCanvas = dynamic(() => import('./RoomCanvas'), { ssr: false });

const DrawDesignPage = () => {
  const [roomDimensions, setRoomDimensions] = useState({ length: 0, width: 0 });
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);

  const handleStartDrawing = (length, width) => {
    setRoomDimensions({ length, width });
    setIsCanvasVisible(true); // Show canvas once dimensions are set
  };

  return (
    <div>
      <h2>Room Designer</h2>
      <ControlPanel onDimensionsSubmit={handleStartDrawing} />
      {isCanvasVisible && <RoomCanvas roomDimensions={roomDimensions} />}
    </div>
  );
};

export default DrawDesignPage;
