"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/dashboard"); // Redirect to dashboard on success
    } else {
      setError("Failed to login"); // Show an error message
      console.error("Failed to login");
    }
  };

  if (session) {
    // User is already logged in, redirect or show a message
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>You are already logged in. Redirecting to the dashboard...</p>
        {router.push("/dashboard")}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
        {error && <p>{error}</p>} {/* Display error message if login fails */}
      </div>
    </main>
  );
}
