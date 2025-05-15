
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Briefcase,
  MapPin, 
  Calendar,
  Clock,
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const MOCK_JOBS = [
  {
    id: "job1",
    title: "Battery Jump Start",
    location: "Downtown, 2.3 miles away",
    date: "Today",
    time: "Available Now",
    price: "$45",
    status: "open"
  },
  {
    id: "job2",
    title: "Flat Tire Replacement",
    location: "Westside, 3.7 miles away",
    date: "Today",
    time: "Available Now",
    price: "$65",
    status: "open"
  },
  {
    id: "job3",
    title: "Oil Change",
    location: "Northside, 1.5 miles away",
    date: "Tomorrow",
    time: "9:00 AM - 12:00 PM",
    price: "$85",
    status: "scheduled"
  },
  {
    id: "job4",
    title: "Brake Inspection",
    location: "Eastside, 5.2 miles away",
    date: "May 18, 2025",
    time: "2:00 PM - 4:00 PM",
    price: "$75",
    status: "scheduled"
  },
  {
    id: "job5",
    title: "Engine Diagnostic",
    location: "Southside, 4.1 miles away",
    date: "May 14, 2025",
    time: "10:00 AM - 12:00 PM",
    price: "$120",
    status: "completed"
  },
  {
    id: "job6",
    title: "Spark Plug Replacement",
    location: "Central Park, 2.8 miles away",
    date: "May 10, 2025",
    time: "3:00 PM - 5:00 PM",
    price: "$150",
    status: "completed"
  }
];

const Jobs = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState("open");
  
  const filteredJobs = MOCK_JOBS.filter(job => {
    return (
      job.status === currentTab && 
      (job.title.toLowerCase().includes(searchText.toLowerCase()) || 
       job.location.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  const handleBackClick = () => {
    if (userRole === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/mechanic-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={handleBackClick} className="p-2">
              <ArrowLeft size={20} className="text-black dark:text-white" />
            </button>
            <h1 className="text-xl font-bold text-black dark:text-white">Jobs</h1>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>

        <Tabs defaultValue="open" className="mb-6" onValueChange={setCurrentTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="open">Available</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          {["open", "scheduled", "completed"].map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <span className="font-bold text-black dark:text-white">{job.price}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <MapPin size={16} className="mr-2 flex-shrink-0" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Calendar size={16} className="mr-2 flex-shrink-0" />
                              <span>{job.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Clock size={16} className="mr-2 flex-shrink-0" />
                              <span>{job.time}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            {status === "open" && (
                              <>
                                <Button className="flex-1" variant="default">Accept Job</Button>
                                <Button className="flex-1" variant="outline">Details</Button>
                              </>
                            )}
                            {status === "scheduled" && (
                              <>
                                <Button className="flex-1" variant="default">Start Work</Button>
                                <Button className="flex-1" variant="outline">Reschedule</Button>
                              </>
                            )}
                            {status === "completed" && (
                              <Button className="flex-1" variant="outline">View Details</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No {status} jobs found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {status === "open" 
                      ? "There are no available jobs at the moment" 
                      : status === "scheduled" 
                        ? "You don't have any scheduled jobs" 
                        : "You don't have any completed jobs yet"}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Jobs;
