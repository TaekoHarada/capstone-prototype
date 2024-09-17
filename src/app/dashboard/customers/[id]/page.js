"use client";

// /app/dashboard/customers/[id]/page.js
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Customer } from "/src/app/models/Customer"; // Adjust the path as needed

const CustomerDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params; // params are passed as props in the new app router

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch customer details using the ID
      // Customer.findById(id).then((data) => setCustomer(data));
    }
  }, [id]);

  const handleSave = () => {
    // Save customer logic...
  };

  const handleDelete = () => {
    // Delete customer logic...
  };

  return (
    <div>
      <h1>Customer Detail Page</h1>
      <p>Customer ID: {id}</p>
      {/* Render form for customer details */}
    </div>
  );
};

export default CustomerDetail;
