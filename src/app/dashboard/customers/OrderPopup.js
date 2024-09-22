import React from 'react';
import { Timestamp } from 'firebase/firestore';

const formatDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString();
  }
  return 'N/A';
};

const OrderPopup = ({ isOpen, closeModal, orders, customerId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Orders for Customer {customerId}</h2>
        <div className="mb-4">
          {orders.length > 0 ? (
            <table className="min-w-full text-gray-900">
              <thead className="bg-gray-50 text-left text-sm font-semibold">
                <tr>
                  <th scope="col" className="px-4 py-3">Order ID</th>
                  <th scope="col" className="px-4 py-3">Total Amount</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                  <th scope="col" className="px-4 py-3">Order Date</th>
                  <th scope="col" className="px-4 py-3">Deliver Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{order.id}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{order.status}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{formatDate(order.orderDate)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">{formatDate(order.deliverDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">No orders found for this customer.</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;