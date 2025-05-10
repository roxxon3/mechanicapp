
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
        {/* Hero Banner */}
        <div className="w-full rounded-xl overflow-hidden mb-8 shadow-lg animate-fade-in relative">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1080&auto=format&fit=crop"
            alt="Professional mechanic working on car engine"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mb-8 animate-fade-in text-center">
          <div className="flex items-center justify-center mb-6">
            <Car size={48} className="text-uber-blue mr-3" />
            <h1 className="text-4xl font-bold text-center text-black dark:text-white">
              MECH-ASSIST
            </h1>
          </div>

          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-10">
            Connecting vehicle owners with skilled mechanics for immediate roadside assistance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
            {/* Vehicle Owner Card */}
            <div className="uber-card p-6 flex flex-col items-center transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=400&auto=format&fit=crop"
                alt="Modern car with open hood"
                className="mb-4 rounded-full w-20 h-20 object-cover shadow"
              />
              <Car size={38} className="text-uber-blue mb-2" />
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
            
            {/* Mechanic Card */}
            <div className="uber-card p-6 flex flex-col items-center transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1630220859110-5c39c8956ca6?q=80&w=400&auto=format&fit=crop"
                alt="Professional mechanic with tools"
                className="mb-4 rounded-full w-20 h-20 object-cover shadow"
              />
              <Wrench size={38} className="text-uber-blue mb-2" />
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

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=400&auto=format&fit=crop"
                alt="Car diagnostic"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-black dark:text-white">Quick Diagnostics</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=400&auto=format&fit=crop"
                alt="24/7 Emergency Service"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-black dark:text-white">24/7 Emergency Service</h3>
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
