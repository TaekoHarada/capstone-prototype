import { jsPDF } from "jspdf";

export const generateInvoice = (invoice) => {
  console.log("generateInvoice", invoice);
  const doc = new jsPDF();

  // Invoice Header
  doc.setFontSize(20);
  doc.text("INVOICE", 90, 20);

  // Company Information
  doc.setFontSize(12);
  doc.text("APITemplate.io", 20, 30);
  doc.text("1234 Main Street", 20, 35);
  doc.text("City, State, Zip", 20, 40);
  doc.text("Phone: (555) 555-5555", 20, 45);
  doc.text("Email: hello@apitemplate.io", 20, 50);

  // Client Information
  doc.text("Bill To:", 20, 60);
  doc.text("Client Name", 20, 65);
  doc.text("Client Address", 20, 70);
  doc.text("City, State, Zip", 20, 75);
  doc.text("Phone: (555) 555-5555", 20, 80);
  doc.text("Email: client@example.com", 20, 85);

  // Download to the local machine
  doc.save("a4.pdf");
};
