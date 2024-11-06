"use client";

import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

const FurnitureItem = ({ item, x, y }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = item.image; // Path from furnitureData.js

    img.onload = () => {
      setImage(img); // Set the image in state once it’s loaded
    };

    img.onerror = () => {
      console.error(`Failed to load image at ${item.image}`);
    };
  }, [item.image]);

  return (
    image && (
      <Image
        x={x}
        y={y}
        image={image}
        width={item.width}
        height={item.height}
        draggable
      />
    )
  );
};

export default FurnitureItem;
