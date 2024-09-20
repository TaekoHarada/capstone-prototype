// This is the component that displays the navigation links in the side navigation.

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Main Menu", href: "/dashboard", icon: HomeIcon },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "User Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-cyan-900  md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
