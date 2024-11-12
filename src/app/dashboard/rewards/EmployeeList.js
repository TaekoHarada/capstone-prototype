// src/app/dashboard/rewards/EmployeeList.js
"use client";

import React from "react";

const EmployeeList = ({ employees }) => {
  const checkPerformanceCriteria = (employee) => {
    const { orderAccuracy, ordersCompleted, rating } = employee;
    return orderAccuracy > 95 && ordersCompleted > 100 && rating >= 4.0;
  };

  return (
    <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md p-6 mt-4">
      <table className="min-w-full table-auto bg-white border-separate border-spacing-0 rounded-lg shadow-sm">
        <thead className="bg-gray-200 text-gray-700 text-sm font-semibold border-b">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Order Accuracy</th>
            <th className="px-6 py-3 text-left">Orders Completed</th>
            <th className="px-6 py-3 text-left">Rating</th>
            <th className="px-6 py-3 text-left">Reward Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const hasReward = checkPerformanceCriteria(employee);

            return (
              <tr
                key={employee.id}
                className="text-sm text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                <td className="border-t border-b px-6 py-4">{employee.name}</td>
                <td className="border-t border-b px-6 py-4">{employee.role}</td>
                <td className="border-t border-b px-6 py-4">
                  {employee.orderAccuracy}%
                </td>
                <td className="border-t border-b px-6 py-4">
                  {employee.ordersCompleted}
                </td>
                <td className="border-t border-b px-6 py-4">
                  {employee.rating}
                </td>
                <td className="border-t border-b px-6 py-4">
                  {hasReward ? (
                    <span className="text-green-600 font-semibold">
                      🏅 Excellence Badge Earned
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Keep up the good work! You're almost there.
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
