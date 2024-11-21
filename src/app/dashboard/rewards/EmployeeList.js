import React from "react";

const EmployeeList = ({ employees, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => onCardClick(employee)}
        >
          <h3 className="text-xl font-bold">{employee.name}</h3>
          <p className="text-gray-600">{employee.role}</p>
          <p className="text-gray-600">Rating: {employee.rating}</p>
          <p className="text-gray-600">
            Orders Completed: {employee.ordersCompleted}
          </p>
          <p className="text-gray-600">
            Order Accuracy: {employee.orderAccuracy}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
