"use client";

import React from "react";
import OrderInfo from "./order-info";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Order from "/src/app/models/Order";
import Link from "next/link";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await Order.findAll();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchClick = async () => {
    const name = document.getElementById("customer-name").value.trim();
    if (!name) {
      setError("Please enter a customer name.");
      return;
    }
    try {
      const results = await Order.findByFirstName(name);
      setOrders(results);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching orders.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h1 className="font-bold text-gray-900 dark:text-white">Order Management {" > "} Order List</h1>
      
      <div className="search-form flex justify-between items-center my-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            id="customer-name"
            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-[9px] pl-10 text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            placeholder="Customer name"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-white" />
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="bg-blue-700 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded ml-3 transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <div>
          <Link href="/dashboard/orders/new">
            <button className="bg-blue-700 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded ml-3 transition-colors duration-200">
              Add New Order
            </button>
          </Link>
        </div>
      </div>

      {error && <div className="text-red-500 dark:text-red-400">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-900 dark:text-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-medium">
            <tr>
              <th scope="col" className="px-3 py-3">Order ID</th>
              <th scope="col" className="px-3 py-3">Status</th>
              <th scope="col" className="px-3 py-3">Customer Name</th>
              <th scope="col" className="px-3 py-3">Item</th>
              <th scope="col" className="px-3 py-3">Shipping</th>
              <th scope="col" className="px-3 py-3">Order</th>
              <th scope="col" className="px-3 py-3">Deliver</th>
              <th scope="col" className="px-4 py-3">Payment</th>
              <th scope="col" className="px-4 py-3">Method</th>
              <th scope="col" className="px-4 py-3">Cost</th>
              <th scope="col" className="px-4 py-3">Paid</th>
              <th scope="col" className="px-4 py-3">Remaining</th>
              <th scope="col" className="px-4 py-3">Invoice</th>
              <th scope="col" className="px-4 py-3"> </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
            {orders.map((order) => (
              <OrderInfo key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;