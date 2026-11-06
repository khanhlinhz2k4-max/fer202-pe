"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, isLoading: authLoading } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorAuth, setErrorAuth] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If already logged in, redirect to /books
  React.useEffect(() => {
    if (!authLoading && user) {
      router.push("/books");
    }
  }, [user, authLoading, router]);

  const validate = (em: string, pw: string) => {
    let eEmail = "";
    let ePass = "";

    if (!em.trim()) {
      eEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) {
      eEmail = "Please enter a valid email address";
    }

    if (!pw) {
      ePass = "Password is required";
    }

    return { eEmail, ePass };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (hasSubmitted) {
      const { eEmail } = validate(val, password);
      setErrorEmail(eEmail);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (hasSubmitted) {
      const { ePass } = validate(email, val);
      setErrorPassword(ePass);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrorAuth("");

    const { eEmail, ePass } = validate(email, password);
    setErrorEmail(eEmail);
    setErrorPassword(ePass);

    if (eEmail || ePass) {
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      setErrorAuth(error.message);
    } else {
      router.push("/books");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md mx-auto shadow-lg border border-border/70 bg-card rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4">
            <form
              data-testid="login-form"
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {errorAuth && (
                <div
                  data-testid="error-auth"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {errorAuth}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  data-testid="login-email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
                {errorEmail && (
                  <span
                    data-testid="error-email"
                    className="text-xs text-destructive mt-0.5"
                  >
                    {errorEmail}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  data-testid="login-password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errorPassword && (
                  <span
                    data-testid="error-password"
                    className="text-xs text-destructive mt-0.5"
                  >
                    {errorPassword}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                data-testid="login-submit"
                disabled={isSubmitting}
                className="w-full mt-2 font-medium"
                size="lg"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>

              <div className="pt-2 text-center text-xs sm:text-sm text-muted-foreground border-t border-border/30 mt-2">
                <span>Don&apos;t have an account? </span>
                <Link
                  href="/register"
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-85"
                >
                  Register
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
