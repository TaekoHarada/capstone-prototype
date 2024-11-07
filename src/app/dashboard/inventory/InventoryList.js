// src/app/dashboard/inventory/InventoryList.js
import InventoryItem from "./InventoryItem";

export default function InventoryList() {
  // For now, mock data is being used.
  const products = [
    { id: 1, name: "Product 1", category: "Category 1", price: "$10", quantity: 100 },
    { id: 2, name: "Product 2", category: "Category 2", price: "$20", quantity: 50 },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Product List</h2>
      <ul className="mt-4 space-y-4">
        {products.map((product) => (
          <InventoryItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
