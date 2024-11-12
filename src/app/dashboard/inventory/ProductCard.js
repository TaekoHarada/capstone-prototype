import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-white hover:bg-[#c5d4db] transition-all duration-200 p-4 rounded-lg shadow-md cursor-pointer"
      style={{
        transition: 'background-color 0.3s ease', // Smooth transition for background color change
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className={`text-sm font-medium ${product.isInStock ? 'text-green-500' : 'text-red-500'}`}>
        {product.isInStock ? 'In Stock' : 'Out of Stock'}
      </p>
    </div>
  );
};

export default ProductCard;
