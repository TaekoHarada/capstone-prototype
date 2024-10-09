"use client";

import Link from "next/link";
import NavLinks from "/src/app/dashboard/nav-links";
import Logo from "/src/app/logo";
import { useRouter } from "next/navigation";
import { useUserAuth } from "/src/app/_utils/auth-context";
import DarkModeToggle from "../components/darkmode/DarkModeToggle";

export default function SideNav() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();
    await firebaseSignOut();
    router.push("/");
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-[#EFEAE4]/20 dark:bg-gray-800 rounded-lg">
      <Link
        className="mb-2 pr-2 grid place-items-center rounded-md md:h-40"
        href="/dashboard"
      >
        <div className="w-32 md:w-40">
          <Logo />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div className="hidden h-auto w-full grow md:block"></div>
        <div className="flex justify-center items-center">
          <DarkModeToggle />
        </div>

        <div className="p-3">
          {user && (
            <div className="mb-4 text-black dark:text-white">
              <p>User: {user?.email}</p>
            </div>
          )}
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              className="w-full bg-[#262930] dark:bg-white text-white dark:text-black font-bold text-sm py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-gray-300"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
