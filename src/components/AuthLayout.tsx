
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="auth-container">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Mechanic Hub
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            Roadside assistance when you need it
          </p>
        </div>
        <div className={cn("auth-card", className)}>
          {children}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          By using our service, you agree to our{" "}
          <a href="#" className="text-mechanic-blue hover:text-blue-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-mechanic-blue hover:text-blue-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
