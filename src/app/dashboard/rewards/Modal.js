import React from "react";
import { calculateBadge } from "../../_utils/badgeLogic";

const Modal = ({ employee, closeModal }) => {
  const badge = calculateBadge(employee); // Get the badge for this employee

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-2xl font-bold mb-4">
          {employee.name} &apos;s Badge
        </h2>
        <p className="text-lg mb-4">Role: {employee.role}</p>
        <p className="text-lg mb-4">Rating: {employee.rating}</p>
        <p className="text-lg mb-4">
          Orders Completed: {employee.ordersCompleted}
        </p>
        <p className="text-lg mb-4">
          Order Accuracy: {employee.orderAccuracy}%
        </p>

        <div className="text-center">
          {badge.earned ? (
            <div className="text-6xl mb-4">{badge.icon}</div>
          ) : (
            <div className="text-xl font-bold text-red-500 mb-4">
              No Badge Yet!
            </div>
          )}
          <p className="text-lg font-semibold">{badge.message}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
