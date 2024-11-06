import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';

const FurnitureItem = ({ item, x, y }) => {
  const rectRef = useRef(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = item.image;

    image.onload = () => {
      if (rectRef.current) {
        rectRef.current.fillPatternImage(image);
        rectRef.current.getLayer().batchDraw();
      }
    };
  }, [item.image]);

  return (
    <Rect
      x={x}
      y={y}
      width={item.width}
      height={item.height}
      ref={rectRef}
      fillPatternScale={{ x: item.width / 100, y: item.height / 100 }}
      draggable
    />
  );
};

export default FurnitureItem;
