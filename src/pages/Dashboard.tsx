
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, User as UserIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-mechanic-dark">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-mechanic-blue text-white flex items-center justify-center">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Welcome to Mechanic Hub!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your account has been created successfully. This is a placeholder dashboard.
            </p>
            <Link
              to="/"
              className="flex items-center text-mechanic-blue hover:text-blue-700"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
