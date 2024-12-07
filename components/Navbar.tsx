"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Navbar entrance animation
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Stagger animation for menu items
    gsap.from(menuItemsRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed w-full bg-white/95 backdrop-blur-sm text-gray-800 py-4 z-50 shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-600 transition-colors"
          >
            SkillSwap
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            {[
              { name: "Home", path: "/" },
              { name: "Skills", path: "/skills" },
              { name: "Community", path: "/community" },
              { name: "About", path: "/about" },
            ].map((item, index) => (
              <li
                key={item.name}
                ref={(el: HTMLLIElement | null) =>
                  void (menuItemsRef.current[index] = el)
                }
                className="relative group"
              >
                <Link
                  href={item.path}
                  className="hover:text-blue-600 transition-colors py-2"
                >
                  {item.name}
                </Link>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Auth Buttons or Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div ref={mobileMenuRef} className="md:hidden overflow-hidden h-0">
          <ul className="pt-4 pb-3 space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Skills", path: "/skills" },
              { name: "Community", path: "/community" },
              { name: "About", path: "/about" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2 space-y-2">
              <div className="flex items-center">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
