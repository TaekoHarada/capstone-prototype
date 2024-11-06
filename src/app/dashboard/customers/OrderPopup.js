import React from 'react';
import { Timestamp } from 'firebase/firestore';

// Helper function to format Firebase Timestamp objects into readable date strings
const formatDate = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString();
  }
  return 'N/A'; // Return 'N/A' if the timestamp is not a valid date
};

const OrderPopup = ({ isOpen, closeModal, orders, customerId }) => {
  // Return null (render nothing) if the popup is not open
  if (!isOpen) return null;

<<<<<<< HEAD
  // Sort the orders by order date in ascending order, handling missing dates by placing them last
=======
  // Sort orders by Order Date, handling null or undefined dates
>>>>>>> 85e07d06e1af66bf8f3704b91ea2b1148564a5a0
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = a.orderDate ? a.orderDate.toMillis() : Infinity;
    const dateB = b.orderDate ? b.orderDate.toMillis() : Infinity;
    return dateA - dateB;
  });

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-900 dark:text-white bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-medium">
              <tr>
                <th scope="col" className="px-3 py-3">Order ID</th>
                <th scope="col" className="px-3 py-3">Status</th>
                <th scope="col" className="px-3 py-3">Order Date</th>
                <th scope="col" className="px-3 py-3">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 py-2">{order.id}</td>
                  <td className="px-3 py-2">{order.status}</td>
                  <td className="px-3 py-2">{formatDate(order.orderDate)}</td>
                  <td className="px-3 py-2">${order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
=======
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Orders for Customer {customerId}</h2>
        <div className="mb-4">
          {sortedOrders.length > 0 ? (
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
                {sortedOrders.map((order) => (
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
>>>>>>> 85e07d06e1af66bf8f3704b91ea2b1148564a5a0
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
