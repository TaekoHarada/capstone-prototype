import { useState } from 'react';

export default function AddProductForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, price: Number(price), stock: Number(stock) };
        console.log("New Product:", newProduct);

        // Clear the form fields
        setName('');
        setPrice('');
        setStock('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-md bg-white mb-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <label className="block mb-4">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </label>
            <label className="block mb-4">
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </label>
            <label className="block mb-4">
                Stock:
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </label>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Add Product
            </button>
        </form>
    );
}
