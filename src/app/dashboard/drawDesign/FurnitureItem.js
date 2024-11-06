import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';

const FurnitureItem = ({ x, y }) => {
  const rectRef = useRef(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = '/dashboard/chair.png'; // Hardcoded path for testing

    image.onload = () => {
      if (rectRef.current) {
        rectRef.current.fillPatternImage(image);
        rectRef.current.getLayer().batchDraw(); // Redraws layer to apply the image
      }
    };

    image.onerror = () => {
      console.error("Failed to load image at /dashboard/chair.png");
    };
  }, []);

  return (
    <Rect
      x={x}
      y={y}
      width={50} // Set to the desired width
      height={50} // Set to the desired height
      ref={rectRef}
      fillPatternScale={{ x: 1, y: 1 }} // Adjust scale as needed
      draggable
    />
  );
};

export default FurnitureItem;
