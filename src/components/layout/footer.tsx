import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex flex-col items-center gap-3 py-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} NextShop. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/product"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="/login"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <a
            href="https://github.com/CheatDev07/nextjs-m2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub Repository"
          >
            GitHub
          </a>
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Made with <Heart className="h-3 w-3 text-red-500" /> in Cambodia
        </p>
      </div>
    </footer>
  );
}
