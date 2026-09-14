"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogIn, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/product", icon: ShoppingBag },
  { label: "Login", href: "/login", icon: LogIn },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-foreground">
          NextShop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden",
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="container mx-auto border-t border-border md:hidden">
          <nav className="flex flex-col gap-1 py-2">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
