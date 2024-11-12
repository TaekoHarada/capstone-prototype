"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const InventoryPage = () => {
  const [products, setProducts] = useState([
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
  ]);

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // States for new product details
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [isInStock, setIsInStock] = useState(true);
  const [image, setImage] = useState(null);

  // Toggle Add Product Form
  const toggleAddProductForm = () => setShowAddProductForm(!showAddProductForm);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle product form submission
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      description,
      isInStock,
      image,
    };
    setProducts([...products, newProduct]);
    resetForm();
  };

  // Reset the form after submitting
  const resetForm = () => {
    setProductName('');
    setDescription('');
    setIsInStock(true);
    setImage(null);
    setShowAddProductForm(false);
  };

  // Open the popup for product details
  const openPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Close the product details popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  // Clean up image URL
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Inventory</h1>


      <button
        onClick={toggleAddProductForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {showAddProductForm ? "Cancel" : "Add Product"}
      </button>

      {/* Add Product Form */}
      {showAddProductForm && (
        <form onSubmit={handleAddProduct} className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock Status</label>
            <select
              value={isInStock}
              onChange={(e) => setIsInStock(e.target.value === 'true')}
              className="w-full p-2 border rounded-md"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {image && <img src={image} alt="Product Preview" className="mt-2 w-24 h-24 object-cover" />}
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Add Product
          </button>
        </form>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => openPopup(product)} // Open the popup on click
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="mb-4">{selectedProduct.description}</p>
            <p>Status: {selectedProduct.isInStock ? "In Stock" : "Out of Stock"}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
              onClick={closePopup} // Close popup when button is clicked
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
