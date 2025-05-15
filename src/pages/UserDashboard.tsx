import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Camera, Clock, 
  History, Settings, MessageSquare, CreditCard, 
  LogOut, Search, ChevronLeft, Shield, Wrench, ArrowLeft, Map, BadgeDollarSign,
  Briefcase, Bell
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PhotoUpload from "@/components/PhotoUpload";
import MechanicsMap from "@/components/MechanicsMap";

const USER_AVATAR =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=80&auto=format&fit=crop";

const USER_HERO =
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1080&auto=format&fit=crop";

const TESTIMONIAL_AVATAR =
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=80&auto=format&fit=crop";

const IndexUserDashboard = () => {
  const { userName, getUnreadCount, logout, sendMessage } = useAuth();
  const navigate = useNavigate();
  const unreadCount = getUnreadCount();
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      description: "See you next time!"
    });
  };

  const handlePhotoUpload = (photoData: string) => {
    sendMessage(
      "mech12345", 
      "Mike (Mechanic)", 
      "Here's a photo of my car issue.", 
      photoData
    );
    setShowPhotoUpload(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft size={20} className="text-black dark:text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-black dark:text-white">Hi, {userName}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle Owner</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={20} className="text-red-500" />
          </Button>
          <Link to="/settings" className="p-2">
            <Settings size={20} className="text-black dark:text-white" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
          <img 
            src={USER_HERO} 
            alt="User with laptop at home" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end p-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Need help on the road?</h2>
              <p className="mb-4">Expert mechanics are just a tap away</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="accent" size="lg" className="mt-2">
                  <MapPin size={18} className="mr-2" />
                  Request Assistance
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-2 bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30"
                  onClick={() => setShowMap(true)}
                >
                  <Map size={18} className="mr-2" />
                  View Area Map
                </Button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => setShowPhotoUpload(true)}
            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-3">
              <Camera size={24} className="text-primary" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">
              Upload Vehicle Photos
            </span>
          </div>
          <div 
            onClick={() => setShowMap(true)}
            className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-3">
              <Map size={24} className="text-primary" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">
              Find Nearby Mechanic
            </span>
          </div>
          <div 
            className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-3">
              <History size={24} className="text-primary" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">
              Service History
            </span>
          </div>
          <Link
            to="/payment" 
            className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-900 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-3">
              <BadgeDollarSign size={24} className="text-primary" />
            </div>
            <span className="text-xs text-center text-gray-800 dark:text-gray-200">
              Make Payment
            </span>
          </Link>
        </div>

        {showPhotoUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Upload Car Issue Photo
              </h3>
              <PhotoUpload onPhotoSelect={handlePhotoUpload} />
              <div className="flex justify-end gap-3 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPhotoUpload(false)}
                >
                  Cancel
                </Button>
                <Button variant="default">
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}

        {showMap && <MechanicsMap onClose={() => setShowMap(false)} />}
        
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">View Map</h2>
        <Card 
          className="mb-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm overflow-hidden"
          onClick={() => setShowMap(true)}
        >
          <div className="relative h-48 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop" 
              alt="Map view" 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button variant="outline" className="bg-white/70 backdrop-blur-sm hover:bg-white/90">
                <Map size={18} className="mr-2" />
                Open Full Map
              </Button>
            </div>
          </div>
        </Card>
        
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

        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">What Our Customers Say</h2>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-5 mb-8">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mr-4">
              <img
                src={TESTIMONIAL_AVATAR}
                alt="John D. testimonial"
                className="w-10 h-10 rounded-full object-cover"
              />
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

        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6">
          <Shield size={24} className="text-uber-blue mr-3" />
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Trusted by over 10,000 vehicle owners nationwide
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-2">
        <div className="container mx-auto flex justify-around">
          {[
            { icon: Car, title: "Home", link: "/user-dashboard", active: true },
            { icon: Briefcase, title: "Jobs", link: "/jobs" },
            { icon: Bell, title: "Alerts", link: "/notifications-tab", badge: unreadCount },
            { icon: MessageSquare, title: "Messages", link: "/notifications", badge: unreadCount },
            { icon: CreditCard, title: "Payments", link: "/payment" }
          ].map((nav) => (
            <Link 
              key={nav.title} 
              to={nav.link} 
              className={`flex flex-col items-center p-2 relative ${nav.active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <nav.icon size={20} />
              {nav.badge && nav.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {nav.badge}
                </span>
              )}
              <span className="text-xs mt-1">{nav.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexUserDashboard;
