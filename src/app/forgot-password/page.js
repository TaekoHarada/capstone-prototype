"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useUserAuth } from "../_utils/auth-context";
import Logo from "../logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { resetPassword } = useUserAuth();

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    } else if (!email.includes("@")) {
      return "Invalid email format";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Error during password reset:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-[url('/background.png')]">
      <div className="w-full max-w-md bg-sky-700 bg-opacity-35 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="w-32 md:w-40 mb-10">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {message && <div className="text-black mb-4">{message}</div>}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Reset Password
            </button>
          </form>
          <Link href="/" className="text-blue-500 hover:text-blue-600 underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}