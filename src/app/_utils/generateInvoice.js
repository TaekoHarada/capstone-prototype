import { jsPDF } from "jspdf";
import Order from "/src/app/models/Order";
import Customer from "/src/app/models/Customer";

export const generateInvoice = async (orderId) => {
  // Fetch order details from the database
  let invoiceOrderData = null;
  let invoiceCustomerData = null;

  try {
    const result = await fetchInvoiceData(orderId);
    if (result) {
      invoiceOrderData = result.orderData;
      invoiceCustomerData = result.customerData;
    }

    // Check if the data is properly fetched
    if (!invoiceOrderData || !invoiceCustomerData) {
      throw new Error("Invoice data is missing.");
    }

    // Create a new PDF document
    const doc = new jsPDF();

    // Optional: Add a logo (make sure the path is correct or comment it out)
    // Add the logo in the top-left corner with a border
    const imgWidth = 40; // Adjust the width of the logo
    const imgHeight = 40; // Adjust the height of the logo
    const xPosition = 10; // X position for the logo
    const yPosition = 4; // Y position for the logo

    
    // Add the logo image (make sure the path is correct)
    doc.addImage("/logo_punjabfurnitures.png", 'PNG', xPosition, yPosition, imgWidth, imgHeight);
    




    

    // Invoice Header
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text("INVOICE", 105, 30, { align: "center" });

    // Add a line under the invoice title
    doc.setDrawColor(0, 102, 204);
    doc.line(60, 35, 150, 35);

    // Company Information (centered and spaced out)
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Punjab Furnitures & Decor", 105, 45, { align: "center" });
    doc.text("76 Westwinds Crescent NE", 105, 52, { align: "center" });
    doc.text("Calgary, AB, T3J 5H2", 105, 59, { align: "center" });
    doc.text("Phone: (403) 798-0063", 105, 66, { align: "center" });
    doc.text("Email: hello@apitemplate.io", 105, 73, { align: "center" });

    // Customer Information (with shaded background)
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(18, 85, 175, 40, 'F'); // Rectangle for customer info section
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text("Bill To:", 20, 90);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Name: " + (invoiceCustomerData.firstname || "N/A") + " " + (invoiceCustomerData.lastname || "N/A"), 20, 100);
    doc.text("Address: " + (invoiceCustomerData.address || "N/A"), 20, 107);
    doc.text("Phone: " + (invoiceCustomerData.phone || "N/A"), 20, 114);

    // Section for item description and order information
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("ITEM DESCRIPTION:", 20, 130);

    doc.setDrawColor(0, 102, 204);
    doc.line(20, 135, 190, 135);

    // Table headers for order details
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text("Item", 20, 145);
    doc.text("Status", 60, 145);
    doc.text("Price", 150, 145);

    doc.line(20, 150, 190, 150); // Header line

    // Order Information (formatted as table rows)
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(invoiceOrderData.orderItemId ? invoiceOrderData.orderItemId.toString() : "N/A", 20, 160);
    doc.text( invoiceOrderData.status, 60, 160); // Replace with the actual item description if available
    doc.text(invoiceOrderData.totalAmount ? invoiceOrderData.totalAmount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) : "N/A", 150, 160);
    doc.line(20, 165, 190, 165); // Line separating rows

    // Payment Terms Section
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("Payment Terms:", 20, 190);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
   
    doc.text("Paid on : "  + invoiceOrderData.paymentDate, 20, 200 ) ; // Display due date
    doc.text("Method of Payment : "  + invoiceOrderData.paymentMethod, 20, 210 )

    // Summary Section
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("Summary:", 20, 220);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
 
doc.text("Cost:           " + (invoiceOrderData.totalAmount ? invoiceOrderData.totalAmount.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) : "N/A"), 20, 230);


doc.text("Amount Paid: " + (invoiceOrderData.paidBalance ? invoiceOrderData.paidBalance.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }) : "N/A"), 20, 240);


const amountLeft = invoiceOrderData.totalAmount && invoiceOrderData.paidBalance
  ? (invoiceOrderData.totalAmount - invoiceOrderData.paidBalance).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
  : "N/A";
doc.text("Amount Left: " + amountLeft, 20, 250);

    // Footer with additional info
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your business!", 105, 280, { align: "center" });
    doc.text("For any questions, please contact us at hello@apitemplate.io.", 105, 285, { align: "center" });

    // Optional: Add a signature line
    doc.setTextColor(0, 102, 204);
    doc.text("Authorized Signature:", 20, 260);
    doc.setTextColor(0, 0, 0);
    doc.line(70, 260, 190, 260); // Signature line

    // Optional: Add page number
    doc.setFontSize(10);
    doc.text("Page 1 of 1", 180, 295);

    // Download to the local machine
    doc.save("Invoice.pdf");
  } catch (error) {
    console.error("Error generating the invoice:", error.message);
  }
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
    