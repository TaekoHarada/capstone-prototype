// src/app/dashboard/rewards/EmployeePerformance.js
import React, { useEffect, useState } from "react";
import { employeePerformanceDAO } from "../../firebase/firestoreDAO";

const EmployeePerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const data = await employeePerformanceDAO.getAll();
      setPerformanceData(data);
    };
    fetchPerformanceData();
  }, []);

  return (
    <div>
      <h1>Employee Performance</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Order Accuracy</th>
            <th>Speed of Order Processing</th>
            <th>Milestones</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((performance) => (
            <tr key={performance.id}>
              <td>{performance.employee_id}</td>
              <td>{performance.order_accuracy}</td>
              <td>{performance.speed_of_order_processing}</td>
              <td>{performance.milestones}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePerformance;
