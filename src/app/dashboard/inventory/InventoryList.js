// src/app/dashboard/inventory/InventoryList.js
import InventoryItem from "./InventoryItem";

export default function InventoryList({ products, editProduct, deleteProduct }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Product List</h2>
      <ul className="mt-4 space-y-4">
        {products.map((product) => (
          <InventoryItem
            key={product.id}
            product={product}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        ))}
      </ul>
    </div>
  );
}
