"use client";
import React, { useState } from "react";
import AddProductForm from './AddProductForm';
import InventoryList from './InventoryList';

export default function InventoryPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Sofa Set", price: "$10,000", quantity: 10 },
    { id: 2, name: "Wooden Chair", price: "$3,000", quantity: 50 },
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
      <AddProductForm addProduct={addProduct} />
      <InventoryList
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
    </main>
  );
}