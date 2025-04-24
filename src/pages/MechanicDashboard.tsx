import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, MapPin, Clock, History, Settings, 
  MessageSquare, CreditCard, LogOut, BellRing,
  UserCheck, Briefcase, ArrowLeft, ToggleLeft
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const MECHANIC_AVATAR =
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=80&auto=format&fit=crop";
const MECHANIC_HERO =
  "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?q=80&w=1080&auto=format&fit=crop";
const MECHANIC_TIP =
  "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=120&auto=format&fit=crop";

const MechanicDashboard = () => {
  const { userName, getUnreadCount } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const unreadCount = getUnreadCount();
  const navigate = useNavigate();
  
  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft size={20} className="text-black dark:text-white" />
            </Button>
            <div className="flex flex-col">
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
        <div className="relative rounded-xl overflow-hidden mb-6 shadow-md">
          <img 
            src={MECHANIC_HERO} 
            alt="Mechanic behind fence" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Ready to help</h2>
              <p className="mb-4">Your expertise makes a difference</p>
              <Button variant="accent" size="lg" className="mt-2" onClick={toggleStatus}>
                {isOnline ? "You are Online" : "Go Online"}
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-black dark:text-white">
              You are currently {isOnline ? "Online" : "Offline"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {isOnline ? "You can receive job requests" : "You will not receive job requests"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button 
              onClick={toggleStatus}
              className={`w-full py-3 ${isOnline ? "bg-green-600" : "bg-gray-500"} text-white font-medium rounded-lg flex items-center justify-center`}
            >
              <ToggleLeft size={18} className="mr-2" />
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Your Stats</h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <Briefcase size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs font-semibold text-black dark:text-white">0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Jobs Today</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <UserCheck size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs font-semibold text-black dark:text-white">0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-uber-blue/10 rounded-full flex items-center justify-center mb-3">
              <CreditCard size={24} className="text-uber-blue" />
            </div>
            <span className="text-xs font-semibold text-black dark:text-white">$0</span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">Earnings</span>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Nearby Requests</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-black dark:text-white">No nearby requests</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1517994112540-009c47ea476b?q=80&w=420&auto=format&fit=crop" 
                alt="Map mechanic area" 
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="flex items-center justify-center flex-col py-2">
              <MapPin size={24} className="text-gray-400 mb-2" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No nearby requests at the moment. New job requests will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Active Jobs</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <img 
                  src={MECHANIC_TIP}
                  alt="Empty mechanic job"
                  className="w-20 h-20 object-cover rounded-lg opacity-50"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <Wrench size={24} className="text-gray-400 mb-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  No active jobs. Jobs you've accepted will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Recent Activity</h2>
        <Card className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=120&auto=format&fit=crop" 
                  alt="Mechanic job history"
                  className="w-20 h-20 object-cover rounded-lg opacity-50"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <Clock size={24} className="text-gray-400 mb-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  No recent activity. Your job history will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Mechanic Tips</h2>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-5 mb-8">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-4">
              <img
                src={MECHANIC_TIP}
                alt="Mechanic giving a tip"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-black dark:text-white">Quick Response Time</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                "Accepting requests quickly increases your chances of getting more jobs and better ratings."
              </p>
            </div>
          </div>
        </div>
      </main>

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
