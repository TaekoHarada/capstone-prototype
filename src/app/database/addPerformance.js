// src/app/database/addPerformance.js
import { employeePerformanceDAO } from "../../firebase/firestoreDAO";

// Sample performance data
const performanceData = {
  employee_id: "employee123",
  order_accuracy: 98.5,
  speed_of_order_processing: 15, // Time in minutes
  milestones: "Completed training, 1000 orders processed",
  date: new Date(),
};

// Add performance data
const addPerformance = async () => {
  const performanceId = "performance123"; // Example performance ID
  await employeePerformanceDAO.create(performanceId, performanceData);
};
