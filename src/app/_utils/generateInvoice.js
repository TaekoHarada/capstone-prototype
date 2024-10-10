import { jsPDF } from "jspdf";
import Order from "/src/app/models/Order";
import Customer from "/src/app/models/Customer";

export const generateInvoice = async (orderId) => {
  // Fetch order details from the database
  let invoiceOrderData = null;
  let invoiceCustomerData = null;

  const result = await fetchInvoiceData(orderId);
  if (result) {
    invoiceOrderData = result.orderData;
    invoiceCustomerData = result.customerData;
  }

  console.log("Invoice Order Data: ", invoiceOrderData);
  console.log("Invoice Customer Data: ", invoiceCustomerData);

  // Create a new PDF document
  const doc = new jsPDF();

  // Styling changes begin here

  // Invoice Header
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204); // Set color to blue for the "INVOICE" title
  doc.text("INVOICE", 90, 20);

  // Add a line under the invoice title
  doc.setDrawColor(0, 102, 204); // Set line color to blue
  doc.line(20, 25, 190, 25);

  // Company Information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Reset text color to black
  doc.text("Punjab Furnitures & Decor", 20, 30);
  doc.text("76 Westwinds Crescent NE", 20, 35);
  doc.text("Calgary, AB, T3J 5H2", 20, 40);
  doc.text("Phone: (403) 798-0063", 20, 45);
  doc.text("Email: hello@apitemplate.io", 20, 50);

  // Customer Information
  doc.setTextColor(0, 51, 102); // Set color to dark blue for the "Bill To:" section
  doc.text("Bill To:", 20, 60);
  doc.setTextColor(0, 0, 0); // Reset color to black for the customer details
  doc.text(
    "Name: " + invoiceCustomerData.firstname + " " + invoiceCustomerData.lastname,
    20,
    70
  );
  doc.text("Address: " + invoiceCustomerData.address, 20, 75);
  doc.text("Phone: " + invoiceCustomerData.phone, 20, 80);

  // Add some spacing and change color for the next section
  doc.setTextColor(0, 102, 204); // Set color to blue for the section titles
  doc.text("ITEM DESCRIPTION:", 20, 90);
  
  doc.setDrawColor(0, 102, 204); // Set color for the separator line
  doc.line(20, 95, 190, 95); // Line under "ITEM DESCRIPTION"

  // Order Information
  doc.setTextColor(0, 0, 0); // Reset color to black for the order details
  doc.text("Order ID: " + invoiceOrderData.id, 20, 100);
  doc.text("Item ID: " + invoiceOrderData.orderItemId, 20, 110);
  doc.text("Cost: " + invoiceOrderData.totalAmount.toString(), 70, 110);

  // Optional: Add a footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150); // Light gray color for the footer
  doc.text("Thank you for your business!", 90, 150);
  doc.text("Please contact us if you have any questions.", 50, 155);

  // Download to the local machine
  doc.save("Invoice.pdf");
};

// Function to fetch invoice data from the database
async function fetchInvoiceData(orderId) {
  console.log("Fetching invoice data for orderId: ", orderId);
  try {
    // Fetch the order details
    const orderData = await Order.findById(orderId);

    // Check if orderData exists before accessing customerId
    if (!orderData) {
      console.log("Order not found");
      return null;
    }

    // Fetch the customer details using the customerId from the order
    const customerData = await Customer.findById(orderData.customerId);

    // Check if customerData exists
    if (!customerData) {
      console.log("Customer not found");
      return null;
    }

    // Return both order and customer data
    return { orderData, customerData };
  } catch (e) {
    console.error("Error fetching order or customer data:", e);
    throw e; // Rethrow the error if you need to handle it elsewhere
  }
};
