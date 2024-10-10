"use client";

import Link from "next/link";
import NavLinks from "/src/app/dashboard/nav-links";
import Logo from "/src/app/logo";
import { useRouter } from "next/navigation";
import { useUserAuth } from "/src/app/_utils/auth-context";

export default function SideNav() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();
    await firebaseSignOut();
    router.push("/"); // Redirect to the login page on sign-out
  };

  return (
    <div
      className="flex h-full flex-col px-3 py-4 md:px-2 bg-[#EFEAE4]/20 rounded-lg" // Changed background color to #EFEAE4
    >
      {/* Logo Section */}
      <Link
        className="mb-2 pr-2 grid place-items-center rounded-md md:h-40"
        href="/dashboard"
      >
        <div className="w-32 md:w-40">
          <Logo />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        {/* Spacer to fill space */}
        <div className="hidden h-auto w-full grow md:block"></div>

        {/* User and Sign Out Section */}
        <div className="p-3">
          {user && (
            <div className="mb-4 text-black">
              <p>User: {user?.email}</p>
            </div>
          )}
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              className="w-full bg-[#262930] text-white font-bold text-sm py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-600"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
