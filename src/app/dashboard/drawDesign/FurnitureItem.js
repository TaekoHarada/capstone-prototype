"use client";

import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

const FurnitureItem = ({ item, x, y }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = item.image; // Path from furnitureData.js

    img.onload = () => {
      setImage(img); 
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

// References
// ChatGPT
// Prompts:
// 1. "How can I display furniture items as images rather than rectangles in a React app using Konva?"
// 2. "How do I dynamically load images in react-konva using URLs provided in an external dataset?"
// 3. "How can I handle image loading errors and only display the image after it has loaded?"
