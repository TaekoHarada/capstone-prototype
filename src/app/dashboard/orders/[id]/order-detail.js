"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Order from "/src/app/models/Order";
import { DatePicker } from "@nextui-org/date-picker";
import { useDateFormatter } from "@react-aria/i18n";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

const OrderDetail = ({ id }) => {
  const router = useRouter();

  const [order, setOrder] = useState({
    status: "",
    customerId: "",
    orderItemId: "",
    shippingType: "",
    totalAmount: 0,
    paidBalance: 0,
    remainingBalance: 0,
    orderDate: null,
    deliverDate: null,
    paymentDate: null,
  });

  const [orderId, setOrderId] = useState("");

  const calculateRemainingBalance = (totalAmount, paidBalance) => {
    const total = parseFloat(totalAmount) || 0;
    const paid = parseFloat(paidBalance) || 0;
    return total - paid;
  };

  // Converts the date string into a compatible format with date picker.
  function convertDateForDatePicker(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split("/").map(Number);
    const formattedMonth = String(month).padStart(2, "0"); // Used for consistent length
    const formattedDay = String(day).padStart(2, "0");
    return parseDate(`${year}-${formattedMonth}-${formattedDay}`); // Converts date string to date object.
  }

  function convertDateForFireStore(dateObj) {
    if (!dateObj || !dateObj.month || !dateObj.day || !dateObj.year) {
      return null;
    }
    return new Date(`${dateObj.month}/${dateObj.day}/${dateObj.year}`);
  }

  useEffect(() => {
    if (id !== "new") {
      Order.findById(id)
        .then((data) => {
          if (data) {
            const orderData = {
              status: data.status,
              customerId: data.customerId,
              orderItemId: data.orderItemId,
              shippingType: data.shippingType,
              totalAmount: data.totalAmount,
              orderDate: convertDateForDatePicker(data.orderDate),
              deliverDate: convertDateForDatePicker(data.deliverDate),
            };
            setOrder(orderData);
          }
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrder((prev) => {
      const updatedOrder = { ...prev, [name]: value };

      if (name === "totalAmount" || name === "paidBalance") {
        updatedOrder.remainingBalance = calculateRemainingBalance(
          updatedOrder.totalAmount,
          updatedOrder.paidBalance
        );
      }
      return updatedOrder;
    });
  };

  const handleIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleDateChange = (date, name) => {
    setOrder((prev) => ({ ...prev, [name]: date }));
  };

  const handleSave = () => {
    const updateOrder = {
      ...order,
      totalAmount: Number(order.totalAmount),
      orderDate: convertDateForFireStore(order.orderDate),
      deliverDate: convertDateForFireStore(order.deliverDate),
      paymentDate: convertDateForFireStore(order.paymentDate),
      updatedAt: new Date(),
    };

    if (id !== "new") {
      Order.update(id, updateOrder)
        .then(() => {
          alert("Order updated successfully");
        })
        .catch((error) => {
          console.error("Error updating order:", error);
          alert("Failed to update order.");
        });
    } else {
      const newOrder = {
        ...updateOrder,
        createdAt: new Date(),
      };

      Order.create(orderId, newOrder)
        .then((newId) => {
          alert(`Order created successfully with ID: ${newId}`);
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          alert("Failed to create order.");
        });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure want to delete this order?")) {
      Order.delete(id)
        .then(() => {
          alert("Order deleted successfully");
          router.back();
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
          alert("Failed to delete order.");
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <button
        type="button"
        onClick={handleBack}
        className="w-full px-4 py-2 mb-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        Back To List
      </button>

      {id === "new" ? (
        <div className="mb-6">
          <label htmlFor="orderId" className="block text-gray-800 font-semibold">
            Order ID:
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={orderId}
            onChange={handleIdChange}
            placeholder="Enter new order ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      ) : (
        <p className="text-gray-800 mb-8 text-center font-semibold">Order ID: {id}</p>
      )}

      <div className="overflow-y-auto max-h-[75vh]">
        <form className="space-y-6">
          <label htmlFor="status" className="block text-gray-800 font-semibold">
            Status:
            <input
              type="text"
              id="status"
              name="status"
              placeholder="Status"
              value={order.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label htmlFor="customerId" className="block text-gray-800 font-semibold">
            Customer ID:
            <input
              type="text"
              id="customerId"
              name="customerId"
              placeholder="Customer ID"
              value={order.customerId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label htmlFor="orderItemId" className="block text-gray-800 font-semibold">
            Order Item ID:
            <input
              type="text"
              id="orderItemId"
              name="orderItemId"
              placeholder="Order Item ID"
              value={order.orderItemId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label htmlFor="shippingType" className="block text-gray-800 font-semibold">
            Shipping Type:
            <input
              type="text"
              id="shippingType"
              name="shippingType"
              placeholder="Shipping Type"
              value={order.shippingType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label htmlFor="totalAmount" className="block text-gray-800 font-semibold">
            Total Amount:
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              placeholder="Total Amount"
              value={order.totalAmount}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label htmlFor="paidBalance" className="block text-gray-800 font-semibold">
            Paid Balance:
            <input
              type="number"
              id="paidBalance"
              name="paidBalance"
              placeholder="Paid Balance"
              value={order.paidBalance}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </label>

          <label htmlFor="remainingBalance" className="block text-gray-800 font-semibold">
            Remaining Balance:
            <input
              type="text"
              id="remainingBalance"
              name="remainingBalance"
              placeholder="Remaining Balance"
              value={order.remainingBalance}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-gray-200"
              readOnly
            />
          </label>

          <label className="block text-gray-800 font-semibold">Order Date:</label>
          <DatePicker
            name="orderDate"
            selected={order.orderDate}
            onChange={(date) => handleDateChange(date, "orderDate")}
            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label className="block text-gray-800 font-semibold">Delivery Date:</label>
          <DatePicker
            name="deliverDate"
            selected={order.deliverDate}
            onChange={(date) => handleDateChange(date, "deliverDate")}
            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <label className="block text-gray-800 font-semibold">Payment Date:</label>
          <DatePicker
            name="paymentDate"
            selected={order.paymentDate}
            onChange={(date) => handleDateChange(date, "paymentDate")}
            className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </form>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleDelete}
          className="w-full mx-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="w-full mx-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
