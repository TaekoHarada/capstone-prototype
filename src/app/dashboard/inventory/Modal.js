import React from 'react';

const Modal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover mb-4 rounded"
        />
        <p>{product.description}</p>
        <p className={`text-${product.isInStock ? 'green' : 'red'}-500`}>
          {product.isInStock ? 'In Stock' : 'Out of Stock'}
        </p>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
