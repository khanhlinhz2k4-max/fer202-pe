import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-xl",
        className
      )}
    >
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest font-medium text-primary px-3 py-1 rounded-full bg-secondary/80 border border-border/40">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-snug">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

