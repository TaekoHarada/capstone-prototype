"use client";
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const InventoryPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Define products with image URLs
  const products = [
    {
      id: "1",
      name: "Modern Bed",
      image: "https://www.pngplay.com/wp-content/uploads/2/Modern-Bed-PNG-Photos.png",
      isInStock: true,
      description: "A stylish and modern bed with a wooden frame.",
    },
    {
      id: "2",
      name: "Sofa",
      image: "https://i5.walmartimages.com/asr/86af7bf1-9d3f-4626-944b-ffef850a59ec_1.92f809dbc61141d775a30e0236a22201.jpeg",
      isInStock: false,
      description: "A comfortable sofa perfect for any living room.",
    },
    {
      id: "3",
      name: "Coffee Table",
      image: "https://th.bing.com/th/id/OIP.3ksCKx4YxATx3LdhP72tsQAAAA?rs=1&pid=ImgDetMain",
      isInStock: true,
      description: "A sleek coffee table that complements modern decor.",
    },
    // Add more products if needed
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>

      {/* Product details section */}
      {selectedProduct && (
        <div className="mt-8 p-4 border-t-2 border-gray-300">
          <h2 className="text-xl font-semibold mb-2">{selectedProduct.name}</h2>
          {/* Apply background with opacity to the entire section */}
          <div className="bg-white bg-opacity-80 p-3 rounded-lg mt-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-md h-auto object-cover rounded-lg"
              style={{ opacity: 0.8 }} // Set opacity on the image itself
            />
            <p className="text-gray-700 mt-2">{selectedProduct.description}</p>
            <p className={`text-lg mt-2 ${selectedProduct.isInStock ? 'text-green-500' : 'text-red-500'}`}>
              {selectedProduct.isInStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
