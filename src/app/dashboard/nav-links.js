import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  StarIcon,
  ArchiveBoxIcon, // Importing an icon for Inventory
} from "@heroicons/react/24/outline";

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
  {
    name: "Rewards",
    href: "/dashboard/rewards",
    icon: StarIcon,
  },
  { name: "Orders", href: "/dashboard/orders", icon: DocumentDuplicateIcon },
  {
    name: "Draw Design",
    href: "/dashboard/drawDesign",
    icon: DocumentDuplicateIcon,
  },
  { name: "User Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },

  // Inventory Link
  { name: "Inventory", href: "/dashboard/inventory", icon: ArchiveBoxIcon },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col items-start justify-start">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 p-3 text-sm font-medium rounded-md text-black dark:text-white bg-transparent transition-all duration-300 ease-linear hover:text-[#2876B0E8] dark:hover:text-[#6BA5D1] active:blur-sm"
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </a>
        );
      })}
    </div>
  );
}
