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

  // Sort the orders by order date in ascending order, handling missing dates by placing them last
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = a.orderDate ? a.orderDate.toMillis() : Infinity;
    const dateB = b.orderDate ? b.orderDate.toMillis() : Infinity;
    return dateA - dateB;
  });

  return (
    // Modal overlay to cover the entire screen with semi-transparency and center the popup
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        {/* Popup header with title */}
        <h2 className="text-2xl font-bold mb-4">Orders for Customer {customerId}</h2>

        <div className="mb-4">
          {/* If there are sorted orders, display them in a table format */}
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
                {/* Map each order to a table row */}
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
            // Display message if no orders are found
            <p className="text-sm text-gray-500">No orders found for this customer.</p>
          )}
        </div>
        
        {/* Close button at the bottom right of the popup */}
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
