
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import SocialAuth from "@/components/SocialAuth";
import { ArrowRight, Mail, Phone, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demonstration, we'll determine the role based on the email
      // In a real app, this would come from your backend
      const userRole = email.includes("mechanic") ? "mechanic" : "user";
      
      login(userRole);
      
      toast({
        title: "Login successful",
        description: "Welcome back to Mechanic Hub!",
      });
      
      // Redirect based on role
      if (userRole === "mechanic") {
        navigate("/mechanic-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Log in to your account
        </p>
      </div>

      <div className="flex mb-6 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        <button
          className={`flex-1 py-2 rounded-md ${
            loginMethod === "email"
              ? "bg-mechanic-blue text-white"
              : "bg-transparent text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setLoginMethod("email")}
        >
          Email
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${
            loginMethod === "phone"
              ? "bg-mechanic-blue text-white"
              : "bg-transparent text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setLoginMethod("phone")}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {loginMethod === "email" ? (
          <AuthInput
            type="email"
            placeholder="Email address"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <AuthInput
            type="tel"
            placeholder="Phone number"
            icon={<Phone size={18} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        )}

        <AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-mechanic-blue focus:ring-mechanic-blue"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-mechanic-blue hover:text-blue-700"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="auth-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              Log in <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>

        <SocialAuth />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-mechanic-blue hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
