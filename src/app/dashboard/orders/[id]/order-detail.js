"use client";

import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import Order from "/src/app/models/Order";
import {DatePicker } from "@nextui-org/date-picker";
import { useDateFormatter } from "@react-aria/i18n";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import CustomDatePicker from './CustomerDatePicker';


const OrderDetail = ({ id }) => {
const router = useRouter();

const [order, setOrder] = useState({
  status:"",
  customerId:"",
  orderItemId:"",
  shippingType:"",
  totalAmount:0,
  paidBalance:0,
  remainingBalance:0,
  orderDate: null,
  delieverDate: null,
  paymentDate: null,
});

const [orderId, setOrderId] = useState("");

const calculateRemainingBalance = (totalAmount, paidBalance) => {
const total = parseFloat(totalAmount) || 0;
const paid = parseFloat(paidBalance) || 0;
return total - paid;
};

function convertDateForDatePicker(dateString) {
  if(!dateString) return null;
  const [month, day, year] = dateString.split("/").map(Number);
  const formattedMonth = String(month).padStart(2,"0");
  const formattedDay = String(day).padStart(2,"0");
  return parseDate(`${year}-${formattedMonth}-${formattedDay}`);
}
function convertDateForFireStore(dateObj) {
  if(!dateObj || !dateObj.month || !dateObj.day || !dateObj.year){
    return null;
  }
  return new
  Date(`${dateObj.month}/${dateObj.day}/${dateObj.year}`);
}

useEffect(()=> {
  if (id !== "new"){
    Order.findById(id).then((data) => {
      if (data) {
        const orderData = {
          status: data.status,
          customerId: data.customerId,
          orderItemId: data.orderItemId,
          shippingType: data.shippingType,
          totalAmount: data.totalAmount,
          orderDate:
          convertDateForDatePicker(data.orderDate),
          delieverDate:
          convertDateForDatePicker(data.delieverDate),
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
    const {name, value } = e.target;

    setOrder((prev) => {
      const updatedOrder = {...prev, [name]:value};

      if (name === "totalAmount" || name === "paidBalance")
       {
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

  const handleDateChange = (date, name)=> {
    setOrder((prev) =>({...prev, [name]:date}));
  };

  const handleSave = () => {
    const updateOrder ={
      ...order,
      totalAmount: Number(order.totalAmount),
      orderDate: convertDateForFireStore(order.orderDate),
      delieverDate: convertDateForFireStore(order.delieverDate),
      paymentDate: convertDateForFireStore(order.paymentDate),
      updatedAt: new Date(),
    };

    if (id !== "new") {
      Order.update(id, updateOrder)
      .then(() => {alert("Order updated successfully");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        alert("Failed to update order." );
      }
      );
    }
    else {
      const newOrder = {
        ...updateOrder,
        createdAt: new Date(),
      };

      Order.create(orderId, newOrder).then((newId) => {
        alert("Order created successfully with ID: ${newId}");
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
    if(window.confirm("Are you sure want to delete this order?")) {
      Order.delete(id).then(() => {
        alert("Order deleted successfully");
        router.back();
      })
      .catch((error)=> {
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

  <div className="flex justify-between mb-6 space-x-4">
    <div className="w-1/3">
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

    <div className="w-1/3">
      <label htmlFor="orderItemId" className="block text-gray-800 font-semibold">
        Order Item ID:
      </label>
      <input
        type="text"
        id="orderItemId"
        name="orderItemId"
        value={order.orderItemId}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/3">
      <label htmlFor="customerId" className="block text-gray-800 font-semibold">
        Customer ID:
      </label>
      <input
        type="text"
        id="customerId"
        name="customerId"
        value={order.customerId}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  </div>

  <div className="flex justify-between mb-6 space-x-4">
    <div className="w-1/2">
      <label htmlFor="status" className="block text-gray-800 font-semibold">
        Status:
      </label>
      <input
        type="text"
        id="status"
        name="status"
        value={order.status}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/2">
      <label htmlFor="shippingType" className="block text-gray-800 font-semibold">
        Shipping Type:
      </label>
      <input
        type="text"
        id="shippingType"
        name="shippingType"
        value={order.shippingType}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  </div>

  <div className="flex justify-between mb-6 space-x-4">
    <div className="w-1/3">
      <label htmlFor="totalAmount" className="block text-gray-800 font-semibold">
        Total Amount:
      </label>
      <input
        type="number"
        id="totalAmount"
        name="totalAmount"
        value={order.totalAmount}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/3">
      <label htmlFor="paidBalance" className="block text-gray-800 font-semibold">
        Paid Balance:
      </label>
      <input
        type="number"
        id="paidBalance"
        name="paidBalance"
        value={order.paidBalance}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/3">
      <label htmlFor="remainingBalance" className="block text-gray-800 font-semibold">
        Remaining Balance:
      </label>
      <input
        type="number"
        id="remainingBalance"
        name="remainingBalance"
        value={order.remainingBalance}
        readOnly
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  </div>

  <div className="flex justify-between mb-6 space-x-4">
    <div className="w-1/3">
      <label htmlFor="orderDate" className="block text-gray-800 font-semibold">
        Order Date:
      </label>
      <DatePicker
        id="orderDate"
        value={order.orderDate}
        onChange={(date) => handleDateChange(date, "orderDate")}
        granularity="day"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/3">
      <label htmlFor="deliverDate" className="block text-gray-800 font-semibold">
        Deliver Date:
      </label>
      <DatePicker
        id="deliverDate"
        value={order.deliverDate}
        onChange={(date) => handleDateChange(date, "deliverDate")}
        granularity="day"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    <div className="w-1/3">
      <label htmlFor="paymentDate" className="block text-gray-800 font-semibold">
        Payment Date:
      </label>
      <DatePicker
        id="paymentDate"
        value={order.paymentDate}
        onChange={(date) => handleDateChange(date, "paymentDate")}
        granularity="day"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  </div>

  <div className="flex justify-between space-x-4 mt-6">
    <button
      type="button"
      onClick={handleSave}
      className="w-1/2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Save
    </button>

     <button
        type="button"
        onClick={handleDelete}
        className="w-1/2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        Delete
      </button>
  </div>
</div>

  );
};

export default OrderDetail;