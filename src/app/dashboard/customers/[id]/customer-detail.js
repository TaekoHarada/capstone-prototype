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
    if (id !== "new") {
      Customer.findById(id)
        .then((data) => {
          if (data) {
            setCustomer({
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              phone: data.phone,
              address: data.address,
              note: data.note,
            });
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
    if (id !== "new") {
      Customer.update(id, customer)
        .then(() => {
          alert("Customer updated successfully");
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
          alert("Failed to update customer");
        });
    } else {
      const newCustomer = {
        ...customer,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Customer.create(customerId, newCustomer)
        .then((newId) => {
          alert("Customer created with ID: " + newId);
        })
        .catch((error) => {
          console.error("Error creating customer:", error);
          alert("Failed to create customer");
        });
    }
  };

  const handleDelete = () => {
    if (id) {
      Customer.delete(id)
        .then(() => {
          alert("Customer deleted successfully");
          router.back();
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
          alert("Failed to delete customer");
        });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/60 shadow-md rounded-md">
      <button
        type="button"
        onClick={handleBack}
        className="w-full px-4 py-2 mb-4 bg-[#262930] text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back to List
      </button>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <p className="text-gray-600 mb-6 text-center">Customer ID: {id}</p>
      )}

      <form className="space-y-4">
        <div>
          <label htmlFor="firstname" className="block text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={customer.firstname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={customer.lastname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700">Address:</label>
          <textarea
            name="address"
            id="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-gray-700">Note:</label>
          <textarea
            name="note"
            id="note"
            placeholder="Note"
            value={customer.note}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>

          {id !== "new" && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerDetail;