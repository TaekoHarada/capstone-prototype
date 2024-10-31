import React from 'react';
import { Rect, Text } from 'react-konva';

const FurnitureItem = ({ item, x, y }) => (
  <>
    <Rect
      x={x}
      y={y}
      width={item.width}
      height={item.height}
      fill="lightblue"
      draggable
    />
    <Text x={x} y={y} text={item.name} fontSize={15} />
  </>
);

export default FurnitureItem;
