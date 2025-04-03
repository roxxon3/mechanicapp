
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Car, Wrench, HelpCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="auth-container">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <div className="flex items-center justify-center mb-6">
            <MapPin size={48} className="text-uber-blue mr-3" />
            <h1 className="text-4xl font-bold text-center text-black dark:text-white">
              Mechanic Hub
            </h1>
          </div>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-10">
            Connecting vehicle owners with skilled mechanics for immediate roadside assistance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
            <div className="uber-card p-6 flex flex-col items-center transition-all hover:shadow-lg">
              <Car size={48} className="text-uber-blue mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                I Need Help With My Vehicle
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-base">
                Get roadside assistance when you need it most
              </p>
              <Link to="/signup" className="w-full">
                <Button variant="uber" size="xl" className="w-full">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            
            <div className="uber-card p-6 flex flex-col items-center transition-all hover:shadow-lg">
              <Wrench size={48} className="text-uber-blue mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                I'm a Mechanic
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-base">
                Offer your services and grow your customer base
              </p>
              <Link to="/signup" className="w-full">
                <Button variant="uber" size="xl" className="w-full">
                  Join Now <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-base text-gray-600 dark:text-gray-300">
              Already have an account?
            </p>
            <Link to="/login" className="block max-w-xs mx-auto">
              <Button variant="outline" size="lg" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-zinc-800">
                Log In
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="#" className="flex items-center text-uber-blue text-base">
              <HelpCircle size={20} className="mr-2" />
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
