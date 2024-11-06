import { useEffect, useState } from "react";
import FirestoreDAO from "../app/database/firestoreDAO"; // Path to the FirestoreDAO class

const employeesDAO = new FirestoreDAO("employees"); // Initialize DAO for 'employees' collection

export default function EmployeeList() {
  // State to store the list of employees
  const [employees, setEmployees] = useState([]);

  // Fetch employees when the component mounts
  useEffect(() => {
    // Function to fetch employees
    const fetchEmployees = async () => {
      try {
        const data = await employeesDAO.getAll(); // Fetch all employees from Firestore
        setEmployees(data); // Update the state with the fetched employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Employee Management</h1>
      <p>List of employees will be displayed here.</p>

      {/* Check if there are any employees */}
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <h3>{employee.name}</h3>
              <p>Email: {employee.email}</p>
              <p>Role: {employee.role}</p>
              <p>Status: {employee.status}</p>
              <p>
                Hire Date:{" "}
                {new Date(
                  employee.hire_date.seconds * 1000
                ).toLocaleDateString()}
              </p>{" "}
              {/* Firestore timestamps */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
