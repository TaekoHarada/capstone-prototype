// src/app/dashboard/rewards/EmployeeList.js

"use client"; // <-- Add this line

import React from "react";

const EmployeeList = ({ employees }) => {
  if (!employees || employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="employee-list bg-white p-6 shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Employee List</h2>
      <table className="min-w-full table-auto text-center">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-4 py-2 border-b">{employee.id}</td>
              <td className="px-4 py-2 border-b">{employee.name}</td>
              <td className="px-4 py-2 border-b">{employee.role}</td>
              <td className="px-4 py-2 border-b">{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
