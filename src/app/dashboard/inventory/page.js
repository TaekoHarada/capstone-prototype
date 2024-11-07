"use client";

import InventoryList from './InventoryList';
import AddProductForm from './AddProductForm';

export default function InventoryPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Product Inventory</h1>
            <AddProductForm />
            <InventoryList />
        </div>
    );
}
