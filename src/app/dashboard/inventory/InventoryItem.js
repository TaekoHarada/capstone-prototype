import React, { useState } from "react";

export default function InventoryItem({ product, editProduct, deleteProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    editProduct(editedProduct); // Save the edited product
    setIsEditing(false); // Exit edit mode
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
  {isEditing ? (
    <input 
      type="text" 
      name="name" 
      value={editedProduct.name} 
      onChange={handleEditChange} 
      className="text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1"
    />
  ) : (
    product.name
  )}
</td>
<td className="px-6 py-4 whitespace-nowrap">
  {isEditing ? (
    <input 
      type="number" 
      name="price" 
      value={editedProduct.price} 
      onChange={handleEditChange} 
      className="text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1"
    />
  ) : (
    `$${product.price}`
  )}
</td>
<td className="px-6 py-4 whitespace-nowrap">
  {isEditing ? (
    <input 
      type="number" 
      name="quantity" 
      value={editedProduct.quantity} 
      onChange={handleEditChange} 
      className="text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1"
    />
  ) : (
    product.quantity
  )}
</td>

      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-600">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600">Edit</button>
        )}
        <button onClick={() => deleteProduct(product.id)} className="text-red-600 ml-4">Delete</button>
      </td>
    </tr>
  );
}
