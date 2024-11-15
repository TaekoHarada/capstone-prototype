import FirestoreDAO from "./firestoreDAO"; // Import FirestoreDAO class
const employeesDAO = new FirestoreDAO("employees"); // Pass the collection name to FirestoreDAO

// Function to add employees
export async function addEmployees() {
  const employeesData = [
    {
      id: "emp001",
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Manager",
        hire_date: new Date(),
        status: "active",
        updatedAt: new Date(),
      },
    },
    {
      id: "emp002",
      data: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Staff",
        hire_date: new Date(),
        status: "active",
        updatedAt: new Date(),
      },
    },
    {
      id: "emp003",
      data: {
        name: "Sam Wilson",
        email: "sam.wilson@example.com",
        role: "Supervisor",
        hire_date: new Date(),
        status: "active",
        updatedAt: new Date(),
      },
    },
  ];

  try {
    // Loop over the employees data and add them to Firestore using FirestoreDAO
    for (const employee of employeesData) {
      await employeesDAO.create(employee.id, employee.data); // Add employee to Firestore
      console.log(`Employee ${employee.id} added`);
    }
  } catch (error) {
    console.error("Error adding employee:", error);
  }
}
