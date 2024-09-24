"use client";

import { useState, useEffect } from "react";

export default function OrderForm({ addOrder, orderToEdit }) {
  const [form, setForm] = useState({
    status: "Intransit",  // Default value
    itemBrief: "",
    orderDate: "",
    deliveryDate: "",
    cost: 0,
    paymentReceived: 0,
    paymentLeft: 0,
    paymentMethod: "debit/credit",  // Default value
  });

  const [error, setError] = useState("");  // State to store validation errors

  // Use useEffect to pre-fill the form if editing an existing order
  useEffect(() => {
    if (orderToEdit) {
      setForm(orderToEdit);  // Pre-fill the form with the order to be edited
    }
  }, [orderToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !form.status ||
      !form.itemBrief ||
      !form.orderDate ||
      !form.deliveryDate ||
      form.cost <= 0 ||
      form.paymentReceived < 0 ||
      !form.paymentMethod
    ) {
      setError("Please fill in all the fields and ensure all values are valid.");
      return;
    }

    // Clear any existing error
    setError("");

    // Calculate the payment left and create/update an order
    const updatedOrder = {
      ...form,
      paymentLeft: form.cost - form.paymentReceived,
    };

    // Add the new order or update the existing one
    addOrder(updatedOrder);

    // Reset the form if not editing
    setForm({
      status: "Intransit",
      itemBrief: "",
      orderDate: "",
      deliveryDate: "",
      cost: 0,
      paymentReceived: 0,
      paymentLeft: 0,
      paymentMethod: "debit/credit"
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>{orderToEdit ? "Edit Order" : "Add New Order"}</h2>  {/* Change title based on editing state */}

      {/* Display error message if fields are not valid */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* Order Status */}
      <label>Order Status</label>
      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="Intransit">Intransit</option>
        <option value="Delivered">Delivered</option>
        <option value="Booked">Booked</option>
      </select>

      {/* Item Brief */}
      <input
        name="itemBrief"
        placeholder="Item Brief"
        value={form.itemBrief}
        onChange={handleChange}
        style={inputStyle}  // Custom input style for scrolling and no text wrapping
        required
      />

      {/* Order Date */}
      <label>Order Date</label>
      <input
        name="orderDate"
        placeholder="Order Date"
        type="date"
        value={form.orderDate}
        onChange={handleChange}
        required
      />

      {/* Delivery Date */}
      <label>Delivery Date</label>
      <input
        name="deliveryDate"
        placeholder="Delivery Date"
        type="date"
        value={form.deliveryDate}
        onChange={handleChange}
        required
      />

      {/* Cost */}
      <label>Cost ($)</label>
      <input
        name="cost"
        type="number"
        min="1"
        placeholder="Cost"
        value={form.cost}
        onChange={handleChange}
        style={inputStyle}  // Custom input style
        required
      />

      {/* Payment Received */}
      <label>Payment Received ($)</label>
      <input
        name="paymentReceived"
        type="number"
        min="0"
        placeholder="Payment Received"
        value={form.paymentReceived}
        onChange={handleChange}
        style={inputStyle}  // Custom input style
        required
      />

      {/* Payment Method */}
      <label>Payment Method</label>
      <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
        <option value="debit/credit">Debit/Credit</option>
        <option value="cash">Cash</option>
        <option value="e-transfer">E-Transfer</option>
        <option value="cheque">Cheque</option>
      </select>

      <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>
        {orderToEdit ? "Update Order" : "Submit Order"}  {/* Change button text based on editing state */}
      </button>
    </form>
  );
}

/* Custom CSS for input fields */
const inputStyle = {
  whiteSpace: 'nowrap',  // Prevent text wrapping
  overflowX: 'auto',  // Enable horizontal scrolling if text overflows
  padding: '10px',
  fontSize: '14px',
  width: '100%',
};

/* Form styling */
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  margin: '20px',
  maxWidth: '100%',
  overflowX: 'auto',
};
