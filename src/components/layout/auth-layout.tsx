import * as React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  title: string;
  description?: string;
  errorMessage?: string | null;
  alternateLink?: {
    text: string;
    linkText: string;
    href: string;
  };
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title,
  description,
  errorMessage,
  alternateLink,
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      {/* Brand Header */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <Logo />
      </div>

      {/* Auth Card Container */}
      <Card
        className={cn(
          "w-full max-w-md mx-auto shadow-md border border-border/60 bg-card rounded-2xl transition-all",
          className
        )}
      >
        <CardHeader className="text-center pb-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-snug">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-4 flex flex-col gap-4">
          {/* Error Message Area */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span className="leading-tight">{errorMessage}</span>
            </div>
          )}

          {/* Form Content Slot */}
          {children}

          {/* Alternate Navigation Link */}
          {alternateLink && (
            <div className="pt-2 text-center text-xs sm:text-sm text-muted-foreground border-t border-border/30 mt-2">
              <span>{alternateLink.text} </span>
              <Link
                href={alternateLink.href}
                className="font-medium text-primary underline underline-offset-4 hover:opacity-85 transition-opacity"
              >
                {alternateLink.linkText}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

