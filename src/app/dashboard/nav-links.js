import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
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
];

export default function NavLinks() {
  return (
    <div className="flex flex-col items-start justify-start"> {/* Stack links vertically */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 p-3 text-sm font-medium rounded-md text-black bg-transparent transition-all duration-300 ease-linear hover:text-[#2876B0E8] active:blur-sm"
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p> {/* Always show text */}
          </a>
        );
      })}
    </div>
  );
}
