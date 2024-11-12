// src/app/dashboard/rewards/page.js
"use client";
import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const fetchedEmployees = [
      {
        id: "emp001",
        name: "John Doe",
        role: "Manager",
        orderAccuracy: 98,
        ordersCompleted: 120,
        rating: 4.5,
      },
      {
        id: "emp002",
        name: "Jane Smith",
        role: "Staff",
        orderAccuracy: 92,
        ordersCompleted: 90,
        rating: 3.8,
      },
      {
        id: "emp003",
        name: "Sam Wilson",
        role: "Supervisor",
        orderAccuracy: 99,
        ordersCompleted: 150,
        rating: 4.9,
      },
    ];
    setEmployees(fetchedEmployees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Main container */}
      <div className="employee-page p-6 bg-white shadow-lg rounded-lg w-full max-w-5xl">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Employee List
        </h1>
        {/* Employee List Component */}
        <EmployeeList employees={employees} />
      </div>
    </div>
  );
};

export default EmployeePage;
