
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, Car, Wrench, HelpCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="auth-container">
      <ThemeToggle />
      {/* Hero Image */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        {/* Boost: Hero banner */}
        <div className="w-full rounded-xl overflow-hidden mb-8 shadow-lg animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1080&auto=format&fit=crop"
            alt="Mechanic holding a wrench near a car"
            className="w-full h-48 object-cover"
          />
        </div>

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
            {/* Rider Card */}
            <div className="uber-card p-6 flex flex-col items-center transition-all hover:shadow-lg">
              {/* Friendly vehicle owner image */}
              <img
                src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=400&auto=format&fit=crop"
                alt="Car owner beside a car"
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
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=400&auto=format&fit=crop"
                alt="Mechanic in uniform with tools"
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
