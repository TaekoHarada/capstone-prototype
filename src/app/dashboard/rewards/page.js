"use client";
import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import Modal from "./Modal"; // Modal component to display employee details and badge
import { calculateBadge } from "../../_utils/badgeLogic"; // Badge calculation logic

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  // Fetch employee data
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

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle employee card click
  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // Close modal
  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-[30vh]">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Check your Performance Status!
        </h1>
      </div>

      <div className="employee-page p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mb-6">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for an employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Filtered Employee List */}
        <EmployeeList
          employees={filteredEmployees}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Modal for Employee Details */}
      {selectedEmployee && (
        <Modal employee={selectedEmployee} closeModal={closeModal} />
      )}
    </div>
  );
};

export default EmployeePage;
