import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import './settings/styles/nav-links.css';

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
    <div className="navLinksContainer flex flex-col"> {/* Stack links vertically */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className="navLink flex items-center gap-2 rounded-md p-3 text-sm font-medium"
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p> {/* Always show text */}
          </a>
        );
      })}
    </div>
  );
}
