// src/app/dashboard/inventory/ProductCard.js
import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      
      {/* Opaque background for text */}
      <div className="bg-white bg-opacity-80 p-3 rounded-lg mt-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className={`text-sm ${product.isInStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.isInStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
