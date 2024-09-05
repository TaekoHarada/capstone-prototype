"use client";

import React, { useState, useEffect } from "react";
import OrderInfo from "./order-info";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Order from "/src/app/models/Order";
import Link from 'next/link';

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
    const orderId = document.getElementById("order-id").value.trim();
    if (!orderId) {
      setError("Please enter an order ID.");
      return;
    }
    try {
      const results = await Order.findById(orderId);
      setOrders(results ? [results] : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching orders.");
    }
  };

  return (
    <div>
      <h1 className="font-bold">Order Management {" > "} Order List</h1>
      <div className="flex justify-between items-center my-4">
        <div className="search-form flex items-center flex-1">
          <div className="relative flex flex-1 flex-shrink-0">
            <input
              id="order-id"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Order ID"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <button
            onClick={handleSearchClick}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-3"
          >
            Search
          </button>
        </div>
        <Link href="/dashboard/orders/new" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-4">
          Add New Order
        </Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="bg-gray-100 text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">
              Order ID
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Customer Name
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Order Date
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Total Amount
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Note
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {" "}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {" "}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
          {orders.map((order) => (
            <OrderInfo key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;