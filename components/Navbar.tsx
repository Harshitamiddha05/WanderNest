"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    router.push("/login");
  };

  const navLinks = user
    ? [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/dashboard", label: "Dashboard" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-green-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>

            <span className="text-xl font-bold text-green-700 dark:text-green-400">
              WanderNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-green-100 text-green-700 dark:bg-gray-800 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-green-50 hover:text-green-700 dark:hover:bg-gray-800 dark:hover:text-green-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user && (
              <>
                <div className="hidden md:flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-green-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <ThemeToggle />
          </div>

          {user ? (
            <>
              <div className="flex items-center gap-3 pt-3">
                <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 text-sm text-gray-500">Guest</div>
          )}
        </div>
      )}
    </nav>
  );
}