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

  // Invoice Header
  doc.setFontSize(20);
  doc.text("INVOICE", 90, 20);

  // Company Information
  doc.setFontSize(12);
  doc.text("Punjab Furnitures & Decor", 20, 30);
  doc.text("76 Westwinds Crescent NE", 20, 35);
  doc.text("Calgary, AB, T3J 5H2", 20, 40);
  doc.text("Phone: (403) 798-0063", 20, 45);
  doc.text("Email: hello@apitemplate.io", 20, 50);

  // Customer Information
  doc.text("Bill To:", 20, 60);
  doc.text(
    "Name: " +
      invoiceCustomerData.firstname +
      " " +
      invoiceCustomerData.lastname,
    20,
    70
  );
  doc.text("Address: " + invoiceCustomerData.address, 20, 75);
  doc.text("Phone: " + invoiceCustomerData.phone, 20, 80);

  // Order Information
  doc.text("ITEM DESCRIPTION:", 20, 90);
  doc.line(20, 95, 190, 95);
  doc.text("Order ID: " + invoiceOrderData.id, 20, 100);
  doc.text("Item ID: " + invoiceOrderData.orderItemId, 20, 110);
  doc.text("Cost: " + invoiceOrderData.totalAmount.toString(), 70, 110);

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
}