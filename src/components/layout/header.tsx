"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/components/common/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur-md">
      <PageContainer>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-accent hover:opacity-90 transition-opacity"
          >
            <span className="size-2 rounded-full bg-primary" />
            <span>{siteConfig.siteName}</span>
          </Link>

          <nav className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  data-testid="user-email"
                  className="text-xs sm:text-sm font-medium text-foreground/80 max-w-[160px] sm:max-w-none truncate"
                >
                  {user.email}
                </span>
                <Link
                  href="/books"
                  data-testid="link-books"
                  className="text-xs sm:text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Books
                </Link>
                <button
                  type="button"
                  data-testid="btn-logout"
                  onClick={() => signOut()}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/login"
                  data-testid="btn-login"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  data-testid="btn-register"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
