
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

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
          <Link to="/" className="block">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Mechanic Hub
            </h1>
          </Link>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2 text-base">
            Roadside assistance when you need it
          </p>
        </div>
        <div className={cn("auth-card", className)}>
          {children}
        </div>
        <div className="mt-8 space-y-4 text-center">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            By using our service, you agree to our{" "}
            <Link to="#" className="text-mechanic-blue hover:text-blue-700 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-mechanic-blue hover:text-blue-700 underline">
              Privacy Policy
            </Link>
          </p>
          
          <div className="flex justify-center">
            <Link 
              to="#" 
              className="flex items-center text-sm text-gray-600 hover:text-mechanic-blue dark:text-gray-400 dark:hover:text-blue-500"
            >
              <HelpCircle size={16} className="mr-1" />
              Need help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
