"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Customer from "/src/app/models/Customer";

const CustomerDetail = ({ id }) => {
  const router = useRouter();

  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    if (id != "new") {
      // Fetch customer details using the ID
      Customer.findById(id)
        .then((data) => {
          if (data) {
            const customerData = {
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phone: data.phone,
              address: data.address,
              note: data.note,
            };
            setCustomer(customerData);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e) => {
    setCustomerId(e.target.value);
  };

  const handleSave = () => {
    console.log("id:", id);
    if (id !== "new") {
      // Update existing customer
      console.log("Updating customer:", customer);
      Customer.update(id, customer).then(() => {
        alert("Customer updated successfully");
      });
    } else {
      // Create new customer
      const newCustomer = {
        ...customer,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Creating new customer:", newCustomer);

      Customer.create(customerId, newCustomer).then((newId) => {
        alert("Customer created with ID:", newId);
      });
    }
  };

  const handleDelete = () => {
    if (id) {
      Customer.delete(id).then(() => {
        console.log("Customer deleted successfully");
        alert("Customer deleted successfully");
        router.back();
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/50 shadow-md rounded-md">
      {id === "new" ? (
        <div className="mb-6">
          <label htmlFor="customerId" className="block text-gray-700">
            Customer ID:
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={customerId}
            onChange={handleIdChange}
            placeholder="Enter new customer ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-6 text-center">Customer ID: {id}</p>
      )}
      <form className="space-y-4">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={customer.firstname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={customer.lastname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="note"
          placeholder="Note"
          value={customer.note}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
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

export default CustomerDetail;
