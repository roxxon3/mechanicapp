
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Car, Wrench, HelpCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="auth-container">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <div className="flex items-center justify-center mb-6">
            <Music size={48} className="text-spotify-green dark:text-uber-blue mr-3" />
            <h1 className="text-4xl font-bold text-center text-white">
              Mechanic Hub
            </h1>
          </div>
          <p className="text-xl text-center text-spotify-text mb-10">
            Connecting vehicle owners with skilled mechanics for immediate roadside assistance
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
            <div className="spotify-card p-6 flex flex-col items-center transition-all hover:shadow-lg hover:bg-spotify-light/95 dark:hover:bg-spotify-gray/95">
              <Car size={48} className="text-spotify-green dark:text-uber-blue mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">
                I Need Help With My Vehicle
              </h2>
              <p className="text-spotify-text text-center mb-6 text-base">
                Get roadside assistance when you need it most
              </p>
              <Link to="/signup" className="w-full">
                <Button variant="spotify" size="xl" className="w-full dark:bg-uber-blue dark:hover:bg-uber-blue/90">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
            
            <div className="spotify-card p-6 flex flex-col items-center transition-all hover:shadow-lg hover:bg-spotify-light/95 dark:hover:bg-spotify-gray/95">
              <Wrench size={48} className="text-spotify-green dark:text-uber-blue mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-white">
                I'm a Mechanic
              </h2>
              <p className="text-spotify-text text-center mb-6 text-base">
                Offer your services and grow your customer base
              </p>
              <Link to="/signup" className="w-full">
                <Button variant="spotify" size="xl" className="w-full dark:bg-uber-blue dark:hover:bg-uber-blue/90">
                  Join Now <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-base text-spotify-text">
              Already have an account?
            </p>
            <Link to="/login" className="block max-w-xs mx-auto">
              <Button variant="outline" size="lg" className="w-full border-spotify-light text-spotify-text hover:bg-spotify-light dark:border-spotify-gray dark:hover:bg-spotify-gray">
                Log In
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="#" className="flex items-center text-spotify-green dark:text-uber-blue text-base">
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
