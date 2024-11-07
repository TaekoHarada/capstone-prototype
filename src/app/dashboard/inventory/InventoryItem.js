// src/app/dashboard/inventory/InventoryItem.js
export default function InventoryItem({ product }) {
    return (
      <li className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </li>
    );
  }
  