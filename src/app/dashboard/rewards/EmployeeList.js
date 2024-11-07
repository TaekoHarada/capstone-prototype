"use client";
import React, { useEffect, useState } from "react";
import FirestoreDAO from "../../database/firestoreDAO";

const employeesDAO = new FirestoreDAO("employees"); // Initialize FirestoreDAO with the 'employees' collection

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeesDAO.getAll(); // Use the getAll method to fetch all employees
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
