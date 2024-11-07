// src/app/dashboard/rewards/page.js

"use client";

import React, { useEffect, useState } from "react";
import { addEmployees } from "../../database/addEmployee"; // Import addEmployees
import EmployeeList from "./EmployeeList"; // Import EmployeeList

const RewardsPage = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    // Dummy employee data
    const fetchedEmployees = [
      { id: "emp001", name: "John Doe", role: "Manager", status: "active" },
      { id: "emp002", name: "Jane Smith", role: "Staff", status: "active" },
      {
        id: "emp003",
        name: "Sam Wilson",
        role: "Supervisor",
        status: "active",
      },
    ];
    setEmployees(fetchedEmployees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployees = async () => {
    try {
      await addEmployees(); // This will add employees to Firestore
      alert("Employees added successfully!");
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      console.error("Error adding employees:", error);
      alert("Failed to add employees.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="rewards-page p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Rewards</h1>
        <EmployeeList employees={employees} />
      </div>

      <div className="flex justify-center w-full">
        <button
          onClick={handleAddEmployees}
          className="bg-blue-500 text-white px-6 py-2 rounded mb-4"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default RewardsPage;
