
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Car, Wrench } from "lucide-react";

const Index = () => {
  return (
    <div className="auth-container">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Mechanic Hub
          </h1>
          <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-6">
            Connecting vehicle owners with skilled mechanics for immediate roadside assistance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
            <div className="auth-card p-6 flex flex-col items-center">
              <Car size={48} className="text-black dark:text-white mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Vehicle Owner
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Get roadside assistance when you need it most
              </p>
              <Link to="/signup" className="auth-btn mt-auto">
                Get started <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="auth-card p-6 flex flex-col items-center">
              <Wrench size={48} className="text-black dark:text-white mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Mechanic
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Offer your services and grow your customer base
              </p>
              <Link to="/signup" className="auth-btn mt-auto">
                Join now <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Already have an account?
            </p>
            <Link to="/login" className="auth-btn-outline max-w-xs mx-auto">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
