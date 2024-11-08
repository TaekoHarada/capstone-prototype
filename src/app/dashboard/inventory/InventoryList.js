import React, { useState } from "react";
import InventoryItem from "./InventoryItem";
import AddProductForm from "./AddProductForm";

export default function InventoryList() {
  // Define initial products state
  const [products, setProducts] = useState([]);

  // Add a new product
  const addProduct = (newProduct) => {
    // Set unique ID for each new product based on current time
    const productWithId = { ...newProduct, id: Date.now() };
    setProducts([...products, productWithId]); // Add new product to the list
  };

  // Edit an existing product
  const editProduct = (updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  // Delete a product
  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="mt-6 p-4 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Inventory Management</h2>
      
      {/* Add Product Form */}
      <div className="space-y-6">
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Add Product</h3>
          <AddProductForm addProduct={addProduct} />
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 bg-opacity-80 rounded-lg shadow-md">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {products.map((product) => (
                <InventoryItem 
                  key={product.id} 
                  product={product} 
                  editProduct={editProduct} 
                  deleteProduct={deleteProduct} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
