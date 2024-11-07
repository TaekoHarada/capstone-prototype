// src/app/dashboard/inventory/InventoryItem.js
export default function InventoryItem({ product, editProduct, deleteProduct }) {
    return (
      <li className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>{product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => editProduct(product)} // Calls editProduct with the entire product
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(product.id)} // Calls deleteProduct with the product id
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
  