import FirestoreDAO from "../app/database/firestoreDAO"; // Path to the FirestoreDAO class

const employeesDAO = new FirestoreDAO("employees"); // Initialize DAO for 'employees' collection

async function addEmployees() {
  const employeesData = [
    {
      id: "emp001",
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Manager",
        hire_date: new Date(), // Firestore will handle the conversion
        status: "active",
        updatedAt: new Date(), // Same here
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
    for (const employee of employeesData) {
      await employeesDAO.create(employee.id, employee.data); // Create each employee in Firestore
      console.log(`Employee ${employee.id} added`);
    }
  } catch (error) {
    console.error("Error adding employee:", error);
  }
}

addEmployees();
