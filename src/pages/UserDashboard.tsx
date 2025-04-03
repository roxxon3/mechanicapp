
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Camera, Clock, 
  History, Settings, MessageSquare, CreditCard, 
  LogOut, Search, ChevronLeft
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

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
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Car size={20} className="text-black dark:text-white" />
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
        {/* Request Assistance Card */}
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-black dark:text-white">Need help?</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Request roadside assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg flex items-center justify-center">
              <MapPin size={18} className="mr-2" />
              Request Assistance
            </button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Camera size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">Upload Photos</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Search size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">Find Mechanic</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <History size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">History</span>
          </div>
        </div>

        {/* Current or Recent Request */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Current Request</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-black dark:text-white">No active requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You don't have any active assistance requests. Use the button above to request help when needed.
            </p>
          </CardContent>
        </Card>

        {/* Past Assistance */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Past Assistance</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center flex-col py-6">
              <Clock size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No history found. Your past service requests will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
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
