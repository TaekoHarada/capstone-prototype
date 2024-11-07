export default function InventoryItem({ product }) {
    return (
        <li className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
        </li>
    );
}
