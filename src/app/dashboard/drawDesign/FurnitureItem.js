import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faTable, faCarpet } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  chair: faChair,
  table: faTable,
  rug: faCarpet,
};

const FurnitureItem = ({ item, x, y }) => (
  <>
    <FontAwesomeIcon
      icon={iconMap[item.id]}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: `${item.width}px`, // Scale icon to match item width
        color: 'lightblue',
      }}
      draggable
    />
    <span style={{ position: 'absolute', left: x, top: y + item.height + 5, fontSize: '12px', color: 'black' }}>
      {item.name}
    </span>
  </>
);

export default FurnitureItem;
