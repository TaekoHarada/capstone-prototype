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
    <div>
      <h1 className="font-bold">Order Management {" > "} Order List</h1>
      <div className="search-form flex justify-between items-center my-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            id="customer-name"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Customer name"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-3"
          >
            Search
          </button>
        </div>
        <div>
          <Link href="/dashboard/orders/new">
            <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-3">
              Add New Order
            </button>
          </Link>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="bg-gray-100 text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">
              Order ID
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Customer Name
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Item
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Shipping
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Order
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Deliver
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Payment
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Cost
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Method
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
