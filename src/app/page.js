// Login page

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

import Logo from "./logo";

export default function Home() {
  const { user, signIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Add new state variables for validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Add validation function
  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await signIn(email, password);
      console.log("result", result);
      if (result.user) {
        router.push("/dashboard");
      } else {
        setError("Failed to login");
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An error occurred during sign-in. Please try again.");
    }
  };

  const handleSignOut = async (event) => {
    event.preventDefault();

    try {
      await firebaseSignOut();
      router.push("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
      setError("An error occurred during sign-out. Please try again.");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <main
  className="flex items-center justify-center min-h-screen p-6 bg-[url('/background.png')] bg-contain bg-no-repeat bg-center bg-fixed"
>
  <div className="w-full max-w-md bg-sky-700 bg-opacity-35 rounded-lg shadow-lg p-8">
    {user ? (
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">Welcome, {user.email}</p>
        <button
          onClick={handleSignOut}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    ) : (
      <div className="flex flex-col items-center">
        <div className="w-32 md:w-40 mb-10">
          <Logo />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full mb-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 ${
            emailError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {emailError && (
          <div className="text-red-500 text-sm mb-2">{emailError}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mb-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 ${
            passwordError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {passwordError && (
          <div className="text-red-500 text-sm mb-2">{passwordError}</div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handleSignIn}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Login
        </button>
        <Link
          href="/forgot-password"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Forgot Password?
        </Link>
      </div>
    )}
  </div>
</main>
 )}