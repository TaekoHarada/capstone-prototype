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
    router.push("/"); // Redirect to login page on sign out
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 pr-2 grid place-items-center rounded-md bg-black md:h-40"
        href="/dashboard"
      >
        <div className="w-32 md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {user && (
          <div className="mb-4">
            <p>User: {user?.email}</p>
          </div>
        )}
        <form onSubmit={handleSignOut}>
          <button
            type="submit"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-50 hover:text-orange-900 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
