import InventoryItem from './InventoryItem';

const mockProducts = [
    { id: 1, name: "Product 1", price: 20, stock: 15 },
    { id: 2, name: "Product 2", price: 35, stock: 8 },
    { id: 3, name: "Product 3", price: 50, stock: 3 },
];

export default function InventoryList() {
    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
            <ul className="space-y-4">
                {mockProducts.map(product => (
                    <InventoryItem key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}
