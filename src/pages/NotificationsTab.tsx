
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Bell,
  Clock,
  Check,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const MOCK_NOTIFICATIONS = [
  {
    id: "notif1",
    title: "Your mechanic is on the way",
    message: "Mike is 10 minutes away from your location",
    time: "10 minutes ago",
    read: false,
    type: "alert"
  },
  {
    id: "notif2",
    title: "Payment processed",
    message: "Your payment of $75 has been successfully processed",
    time: "1 hour ago",
    read: true,
    type: "info"
  },
  {
    id: "notif3",
    title: "Service completed",
    message: "Your brake inspection service has been completed",
    time: "Yesterday",
    read: true,
    type: "success"
  },
  {
    id: "notif4",
    title: "New mechanic available",
    message: "John is now available to help with your car issues",
    time: "2 days ago",
    read: true,
    type: "info"
  },
  {
    id: "notif5",
    title: "Appointment reminder",
    message: "Don't forget your scheduled oil change tomorrow at 9:00 AM",
    time: "3 days ago",
    read: false,
    type: "alert"
  }
];

const NotificationsTab = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [currentTab, setCurrentTab] = useState("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  const filteredNotifications = currentTab === "all" 
    ? notifications
    : currentTab === "unread"
      ? notifications.filter(notif => !notif.read)
      : notifications;

  const handleBackClick = () => {
    if (userRole === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/mechanic-dashboard");
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string, read: boolean) => {
    const className = `${read ? 'text-gray-400' : 'text-primary'}`;
    
    switch(type) {
      case 'alert':
        return <AlertCircle size={20} className={className} />;
      case 'success':
        return <CheckCircle size={20} className={className} />;
      case 'info':
      default:
        return <Info size={20} className={className} />;
    }
  };
  
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={handleBackClick} className="p-2">
              <ArrowLeft size={20} className="text-black dark:text-white" />
            </button>
            <h1 className="text-xl font-bold text-black dark:text-white">Notifications</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check size={16} className="mr-2" />
              Mark all read
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="all">
              All
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[calc(100vh-220px)]">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 rounded-lg border ${notif.read 
                        ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black' 
                        : 'border-primary/30 bg-primary/5 dark:bg-primary/10'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notif.type, notif.read)}
                        </div>
                        <div className="flex-grow">
                          <h3 className={`text-sm font-medium ${notif.read ? 'text-gray-900 dark:text-gray-100' : 'text-black dark:text-white'}`}>
                            {notif.title}
                          </h3>
                          <p className={`text-sm ${notif.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                            {notif.message}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {notif.time}
                          </div>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No notifications</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-4">
            <ScrollArea className="h-[calc(100vh-220px)]">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className="p-4 rounded-lg border border-primary/30 bg-primary/5 dark:bg-primary/10"
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notif.type, notif.read)}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-black dark:text-white">
                            {notif.title}
                          </h3>
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {notif.message}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {notif.time}
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No unread notifications</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    You've read all your notifications
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NotificationsTab;
