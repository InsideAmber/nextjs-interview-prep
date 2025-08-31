"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Rendering",
    path: "/topics/rendering",
    children: [
      { name: "CSR", path: "/topics/rendering/csr" },
      { name: "SSR", path: "/topics/rendering/ssr" },
      { name: "SSG", path: "/topics/rendering/ssg" },
      { name: "ISR", path: "/topics/rendering/isg" },
    ],
  },
  { name: "Routing", path: "/topics/routing" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg relative">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li
            key={item.path}
            className="relative"
            onMouseEnter={() => item.children && setOpenDropdown(true)}
            onMouseLeave={() => item.children && setOpenDropdown(false)}
          >
            <Link
              href={item.path}
              className={`${
                pathname === item.path
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-gray-300"
              } transition-colors`}
            >
              {item.name}
            </Link>

            {/* Dropdown for Rendering */}
            {item.children && openDropdown && (
              <ul className="absolute left-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-lg py-2">
                {item.children.map((child) => (
                  <li key={child.path}>
                    <Link
                      href={child.path}
                      className={`block px-4 py-2 ${
                        pathname === child.path
                          ? "text-yellow-400 font-semibold"
                          : "hover:text-gray-300"
                      } transition-colors`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
