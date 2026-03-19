"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculator", label: "Calculators" },
  { href: "/states/california", label: "By State" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-sky-500 font-bold text-xl">
          <Home className="w-6 h-6" />
          <span>AffordHome<span className="text-gray-800">USA</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-600 hover:text-sky-500 font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Calculate Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-gray-600 hover:text-sky-500 font-medium border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="block mt-3 text-center bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Calculate Now
          </Link>
        </div>
      )}
    </header>
  );
}
