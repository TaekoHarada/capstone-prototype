import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

const FurnitureItem = ({ item, x, y }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = item.image; // Using the hardcoded path from furnitureData.js

    img.onload = () => {
      setImage(img); // Set the image only after it has fully loaded
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
