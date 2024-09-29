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
    orderDate: null, // Allow null for empty date
    deliverDate: null,
    paymentDate: null,
  });

  const [orderId, setOrderId] = useState("");

  // Format from "9/17/2024" to parseDate("2024-09-17") to use in DatePicker
  function convertDateForDatePicker(dateString) {
    if (dateString === null) {
      return null;
    }
    // Split the date string into components
    const [month, day, year] = dateString.split("/").map(Number);

    // Format the components to ensure two-digit month and day
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    // Return the formatted date string
    return parseDate(`${year}-${formattedMonth}-${formattedDay}`);
  }

  // Convert date object (DatePicker) to Firestore format
  function convertDateForFireStore(dateObj) {
    console.log("convertDateForFireStore dateObj: ", dateObj);
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
              paymentDate: convertDateForDatePicker(data.paymentDate),
            };
            setOrder(orderData);
          }
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleDateChange = (date, name) => {
    setOrder((prev) => ({ ...prev, [name]: date || null }));
  };

  const handleSave = () => {
    // Convert date to string "9/17/2024"
    // Convert string to number
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

  const handleDelete = () => {};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="px-4 py-2 mb-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back to List
      </button>

      {id === "new" ? (
        <div className="mb-6">
          <label htmlFor="orderId" className="block text-gray-700">
            Order ID:
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={orderId}
            onChange={handleIdChange}
            placeholder="Enter new order ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-6 text-center">Order ID: {id}</p>
      )}

      <form className="space-y-4">
        <label htmlFor="status" className="block">
          Status:
          <input
            type="text"
            id="status"
            name="status"
            placeholder="Status"
            value={order.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label htmlFor="customerId" className="block">
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
        <label htmlFor="orderItemId" className="block">
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
        <label htmlFor="shippingType" className="block">
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
        <div className="flex space-x-4">
          <label htmlFor="totalAmount" className="block flex-1">
            Total Amount:
            <input
              type="text"
              id="totalAmount"
              name="totalAmount"
              placeholder="Total Amount"
              value={order.totalAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </label>
          <label htmlFor="paidBalance" className="block flex-1">
            Paid Balance:
            <input
              type="text"
              id="paidBalance"
              name="paidBalance"
              placeholder="Paid Balance"
              value={order.paidBalance}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </label>
          <label htmlFor="remainingBalance" className="block flex-1">
            Remaining Balance:
            <input
              type="text"
              id="remainingBalance"
              name="remainingBalance"
              placeholder="Remaining Balance"
              value={order.remainingBalance}
              // onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-gray-100"
              readOnly
            />
          </label>
        </div>
        <DatePicker
          className="max-w-[284px]"
          label="Order Date"
          value={order.orderDate}
          onChange={(date) => handleDateChange(date, "orderDate")}
        />
        <DatePicker
          className="max-w-[284px]"
          label="Deliver Date"
          value={order.deliverDate}
          onChange={(date) => handleDateChange(date, "deliverDate")}
        />
        <DatePicker
          className="max-w-[284px]"
          label="Payment Date"
          value={order.paymentDate}
          onChange={(date) => handleDateChange(date, "paymentDate")}
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          {id !== "new" ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderDetail;
