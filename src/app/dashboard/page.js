"use client";
import { useState } from 'react';

export default function Page() {
  // Static data for demonstration purposes
  const [customerCount] = useState(150);
  const [orderCount] = useState(75);
  const [recentOrders] = useState([
    { id: '001', customer: 'John Doe', amount: 1200, date: '2023-06-01' },
    { id: '002', customer: 'Jane Smith', amount: 850, date: '2023-05-30' },
    { id: '003', customer: 'Bob Johnson', amount: 2000, date: '2023-05-29' },
  ]);
  const [topProducts] = useState([
    { name: 'Dining Table', sales: 25 },
    { name: 'Sofa Set', sales: 20 },
    { name: 'Bed Frame', sales: 18 },
  ]);

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="bg-white bg-opacity-55 p-6 rounded-lg text-center max-w-md w-full mb-6">
        <div className="text-blue-950 font-bold italic text-5xl">Welcome</div>
        <div className="text-blue-950 font-bold mt-3">
          To Punjab Furnitures & Decor
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white bg-opacity-55 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Analytics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-xl font-semibold text-blue-950">Customers</p>
              <p className="text-3xl font-bold text-blue-600">{customerCount}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-xl font-semibold text-blue-950">Orders</p>
              <p className="text-3xl font-bold text-green-600">{orderCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-55 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Recent Orders</h2>
          <ul>
            {recentOrders.map(order => (
              <li key={order.id} className="mb-2 p-2 bg-gray-100 rounded">
                <p className="font-semibold">{order.customer}</p>
                <p className="text-sm text-gray-600">
                  Amount: ${order.amount} | Date: {order.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white bg-opacity-55 p-6 rounded-lg md:col-span-2">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Top Selling Products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topProducts.map((product, index) => (
              <li key={index} className="bg-yellow-100 p-4 rounded-lg">
                <p className="font-semibold">{product.name}</p>
                <p className="text-lg font-bold text-yellow-600">{product.sales} sold</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
