import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  name?: string;
}

export function Logo({ className, name = siteConfig.siteName }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-heading text-xl font-bold tracking-wider text-foreground hover:opacity-90 transition-opacity",
        className
      )}
    >
      <span className="size-2 rounded-full bg-primary" />
      <span>{name}</span>
    </Link>
  );
}

