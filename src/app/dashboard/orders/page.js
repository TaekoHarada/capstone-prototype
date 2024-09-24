"use client";

import { useState } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);  // State to show/hide the form
  const [editingOrder, setEditingOrder] = useState(null);  // Track the order being edited

  const addOrder = (newOrder) => {
    newOrder.id = orders.length + 1;
    setOrders([...orders, newOrder]);
    setShowForm(false);  // Hide the form after adding an order
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const editOrder = (id) => {
    const orderToEdit = orders.find(order => order.id === id);
    setEditingOrder(orderToEdit);  // Set the order to be edited
    setShowForm(true);  // Show the form with pre-filled values
  };

  const updateOrder = (updatedOrder) => {
    setOrders(orders.map(order => (order.id === updatedOrder.id ? updatedOrder : order)));
    setShowForm(false);  // Hide the form after updating
    setEditingOrder(null);  // Clear editing state
  };

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={headingStyle}>Order List</h1>
        <button
          onClick={() => { setShowForm(true); setEditingOrder(null); }}  // Clear editing state for adding new order
          style={addButtonStyle}
        >
          + Add Order
        </button>
      </div>
      
      {!showForm ? (
        <OrderList orders={orders} onDelete={deleteOrder} onEdit={editOrder} />
      ) : (
        <OrderForm
          addOrder={editingOrder ? updateOrder : addOrder}  // If editing, update the order
          orderToEdit={editingOrder}  // Pass the order to be edited (if any)
        />
      )}
    </main>
  );
}

/* Styling for the heading */
const headingStyle = {
  fontWeight: 'bold',
  fontSize: '32px',
  textAlign: 'center',
  margin: '20px 0',
  flex: 1,
};

/* Styling for the add order button */
const addButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  flexShrink: 0,
};
