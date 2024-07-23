"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Home() {
  const { user, signIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    const result = await signIn(email, password);
    console.log("result", result);
    if (result.user) {
      router.push("/dashboard"); // Redirect to dashboard on success
    } else {
      setError("Failed to login"); // Show an error message
      console.error("Failed to login");
    }
  };

  const handleSignOut = async (event) => {
    event.preventDefault();

    await firebaseSignOut();
    router.push("/"); // Redirect to login page on sign out
  };

  return (
    <main>
      {user ? (
        <>
          <p>Welcome, ({user.email})</p>
          <button
            onClick={handleSignOut}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold text-sm py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2"
            />
          </div>
          <div>{error}</div>
          <button
            onClick={handleSignIn}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold text-sm py-2 px-4 rounded"
          >
            Login
          </button>
        </>
      )}
    </main>
  );
}
