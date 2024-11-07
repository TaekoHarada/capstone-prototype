"use client";
import React, { useState } from "react"; // Add this import to use useState
import AddProductForm from './AddProductForm';
import InventoryItem from "./InventoryItem";

export default function InventoryPage() {
    const [products, setProducts] = useState([
      { id: 1, name: 'Product 1', category: 'Category 1', price: '$10', quantity: 100 },
      { id: 2, name: 'Product 2', category: 'Category 2', price: '$20', quantity: 50 },
    ]);

    const addProduct = (newProduct) => {
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: prevProducts.length + 1, ...newProduct },
      ]);
    };

    const editProduct = (id, updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    };

    const deleteProduct = (id) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    };

    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">Inventory Management</h1>
        
        {/* Render the AddProductForm directly */}
        <AddProductForm addProduct={addProduct} />

        <ul className="mt-6 space-y-4">
          {products.map((product) => (
            <InventoryItem
              key={product.id}
              product={product}
              editProduct={(updatedProduct) => editProduct(product.id, updatedProduct)}
              deleteProduct={() => deleteProduct(product.id)}
            />
          ))}
        </ul>
      </main>
    );
}
