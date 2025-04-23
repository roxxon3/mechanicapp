
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Camera, Clock, 
  History, Settings, MessageSquare, CreditCard, 
  LogOut, Search, ChevronLeft, Shield, Wrench
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const { userName, getUnreadCount } = useAuth();
  const unreadCount = getUnreadCount();
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      {/* Header with user info */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Avatar with friendly user photo */}
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=80&auto=format&fit=crop"
                alt="User"
                className="object-cover w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white">Hi, {userName}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle Owner</p>
            </div>
          </div>
          <Link to="/settings" className="p-2">
            <Settings size={20} className="text-black dark:text-white" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?q=80&w=1080&auto=format&fit=crop" 
            alt="Roadside car requiring assistance" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Need help on the road?</h2>
              <p className="mb-4">Expert mechanics are just a tap away</p>
              <Button variant="accent" size="lg" className="mt-2">
                <MapPin size={18} className="mr-2" />
                Request Assistance
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <Camera size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">Upload Photos</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <Search size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">Find Mechanic</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <History size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">History</span>
          </div>
        </div>

        {/* Services Section */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Our Services</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm transition-all hover:shadow-md">
            <div className="relative h-32">
              <img 
                src="https://images.unsplash.com/photo-1606577924006-27d39b132ae2?q=80&w=420&auto=format&fit=crop" 
                alt="Battery jump start service" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">Battery Jump Start</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Quick battery assistance</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm transition-all hover:shadow-md">
            <div className="relative h-32">
              <img 
                src="https://images.unsplash.com/photo-1507872739765-7ad2b7b4dcb6?q=80&w=420&auto=format&fit=crop" 
                alt="Tire change service" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">Tire Change</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Fast tire replacement</p>
            </CardContent>
          </Card>
        </div>

        {/* Current or Recent Request */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Current Request</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-black dark:text-white">No active requests</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="mr-4">
              <img 
                src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=120&auto=format&fit=crop" 
                alt="Empty assistance state"
                className="w-20 h-20 object-cover rounded-lg opacity-50"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You don't have any active assistance requests. Use the button above to request help when needed.
            </p>
          </CardContent>
        </Card>

        {/* Customer Testimonials */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">What Our Customers Say</h2>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-5 mb-8">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-uber-blue rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
            <div>
              <h4 className="font-medium text-black dark:text-white">John D.</h4>
              <div className="flex items-center text-yellow-500 mb-2">
                ★★★★★ <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">5.0</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "The mechanic arrived within 20 minutes and had my car running again in no time. Great service!"
              </p>
            </div>
          </div>
        </div>

        {/* Trusted by Badge */}
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6">
          <Shield size={24} className="text-uber-blue mr-3" />
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Trusted by over 10,000 vehicle owners nationwide
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-2">
        <div className="container mx-auto flex justify-around">
          <Link to="/user-dashboard" className="flex flex-col items-center p-2">
            <Car size={20} className="text-black dark:text-white" />
            <span className="text-xs mt-1 text-black dark:text-white">Home</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center p-2">
            <History size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">History</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center p-2 relative">
            <MessageSquare size={20} className="text-gray-500 dark:text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Messages</span>
          </Link>
          <Link to="/payments" className="flex flex-col items-center p-2">
            <CreditCard size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Payments</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
