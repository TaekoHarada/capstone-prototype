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
    setIsCanvasVisible(true);
  };

  return (
    <div>
      <button onClick={() => setIsCanvasVisible(!isCanvasVisible)}>Draw Design</button>
      {isCanvasVisible && (
        <div>
          <ControlPanel onDimensionsSubmit={handleStartDrawing} />
          <RoomCanvas roomDimensions={roomDimensions} />
        </div>
      )}
    </div>
  );
};

export default DrawDesignPage;
