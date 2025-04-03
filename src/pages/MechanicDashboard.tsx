
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, MapPin, Clock, History, Settings, 
  MessageSquare, CreditCard, LogOut, BellRing,
  UserCheck, Briefcase, ChevronLeft, ToggleLeft
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const MechanicDashboard = () => {
  const { userName, getUnreadCount } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const unreadCount = getUnreadCount();
  
  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      {/* Header with mechanic info */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Wrench size={20} className="text-black dark:text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white">Hi, {userName}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mechanic</p>
            </div>
          </div>
          <Link to="/settings" className="p-2">
            <Settings size={20} className="text-black dark:text-white" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        {/* Online Status Toggle */}
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-black dark:text-white">
              You are currently {isOnline ? 'Online' : 'Offline'}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {isOnline ? 'You can receive job requests' : 'You will not receive job requests'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button 
              onClick={toggleStatus}
              className={`w-full py-3 ${isOnline ? 'bg-green-600' : 'bg-gray-500'} text-white font-medium rounded-lg flex items-center justify-center`}
            >
              <ToggleLeft size={18} className="mr-2" />
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Your Stats</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Briefcase size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs font-semibold text-black dark:text-white">0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Jobs Today</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <UserCheck size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs font-semibold text-black dark:text-white">0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <CreditCard size={24} className="mb-2 text-black dark:text-white" />
            <span className="text-xs font-semibold text-black dark:text-white">$0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Earnings</span>
          </div>
        </div>

        {/* Nearby Requests */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Nearby Requests</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center flex-col py-6">
              <MapPin size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No nearby requests at the moment. New job requests will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Jobs */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Active Jobs</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center flex-col py-6">
              <Wrench size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No active jobs. Jobs you've accepted will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Recent Activity</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center flex-col py-6">
              <Clock size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No recent activity. Your job history will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-2">
        <div className="container mx-auto flex justify-around">
          <Link to="/mechanic-dashboard" className="flex flex-col items-center p-2">
            <Wrench size={20} className="text-black dark:text-white" />
            <span className="text-xs mt-1 text-black dark:text-white">Home</span>
          </Link>
          <Link to="/jobs" className="flex flex-col items-center p-2">
            <Briefcase size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Jobs</span>
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
          <Link to="/alerts" className="flex flex-col items-center p-2">
            <BellRing size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Alerts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
