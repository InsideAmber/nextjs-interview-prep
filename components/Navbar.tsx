"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Rendering", path: "/topics/rendering" },
  { name: "Routing", path: "/topics/routing" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  console.log(pathname)

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path ? "text-yellow-400 font-semibold" : "hover:text-gray-300"
              } transition-colors`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
