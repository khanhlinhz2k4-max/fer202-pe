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

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, user, isLoading: authLoading } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState("");
  const [errorAuth, setErrorAuth] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // If already logged in, redirect to /books
  React.useEffect(() => {
    if (!authLoading && user) {
      router.push("/books");
    }
  }, [user, authLoading, router]);

  const validate = (em: string, pw: string, cpw: string) => {
    let eEmail = "";
    let ePass = "";
    let eCPass = "";

    if (!em.trim()) {
      eEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())) {
      eEmail = "Please enter a valid email address";
    }

    if (!pw) {
      ePass = "Password is required";
    } else if (pw.length < 6) {
      ePass = "Password must be at least 6 characters";
    }

    if (!cpw) {
      eCPass = "Confirm password is required";
    } else if (cpw !== pw) {
      eCPass = "Passwords do not match";
    }

    return { eEmail, ePass, eCPass };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (hasSubmitted) {
      const { eEmail } = validate(val, password, confirmPassword);
      setErrorEmail(eEmail);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (hasSubmitted) {
      const { ePass, eCPass } = validate(email, val, confirmPassword);
      setErrorPassword(ePass);
      setErrorConfirmPassword(eCPass);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (hasSubmitted) {
      const { eCPass } = validate(email, password, val);
      setErrorConfirmPassword(eCPass);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrorAuth("");
    setFormSuccess("");

    const { eEmail, ePass, eCPass } = validate(email, password, confirmPassword);
    setErrorEmail(eEmail);
    setErrorPassword(ePass);
    setErrorConfirmPassword(eCPass);

    if (eEmail || ePass || eCPass) {
      return;
    }

    setIsSubmitting(true);
    const { error } = await signUp(email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      setErrorAuth(error.message);
    } else {
      setFormSuccess("Registration successful");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setHasSubmitted(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md mx-auto shadow-lg border border-border/70 bg-card rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">
              Register
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4">
            <form
              data-testid="register-form"
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

              {formSuccess && (
                <div
                  data-testid="form-success"
                  className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary font-medium"
                >
                  {formSuccess}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  data-testid="register-email"
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
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  data-testid="register-password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  data-testid="register-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errorConfirmPassword && (
                  <span
                    data-testid="error-confirm-password"
                    className="text-xs text-destructive mt-0.5"
                  >
                    {errorConfirmPassword}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                data-testid="register-submit"
                disabled={isSubmitting}
                className="w-full mt-2 font-medium"
                size="lg"
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </Button>

              <div className="pt-2 text-center text-xs sm:text-sm text-muted-foreground border-t border-border/30 mt-2">
                <span>Already have an account? </span>
                <Link
                  href="/login"
                  className="font-medium text-primary underline underline-offset-4 hover:opacity-85"
                >
                  Login
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
