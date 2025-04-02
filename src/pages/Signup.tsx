
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import SocialAuth from "@/components/SocialAuth";
import RoleSelector from "@/components/RoleSelector";
import { ArrowRight, Mail, Phone, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mechanic" | "user" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1 && name && email && phone && password) {
      setStep(2);
      return;
    }

    if (step === 2 && role) {
      setIsLoading(true);
      // Simulate signup process
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Account created",
          description: "Welcome to Mechanic Hub!",
        });
        navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {step === 1
            ? "Fill in your details below"
            : "Select your account type"}
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            placeholder="Full name"
            icon={<User size={18} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <AuthInput
            type="email"
            placeholder="Email address"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            type="tel"
            placeholder="Phone number"
            icon={<Phone size={18} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <AuthInput
            type="password"
            placeholder="Create password"
            icon={<Lock size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn mt-6">
            Continue <ArrowRight size={18} className="ml-2" />
          </button>

          <SocialAuth />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-mechanic-blue hover:text-blue-700"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <RoleSelector
            selectedRole={role}
            onChange={(selectedRole) => setRole(selectedRole)}
          />

          <button
            type="submit"
            className="auth-btn mt-6"
            disabled={isLoading || !role}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Create account <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>

          <button
            type="button"
            className="mt-4 w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-mechanic-blue"
            onClick={() => setStep(1)}
          >
            Go back
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default SignupPage;
