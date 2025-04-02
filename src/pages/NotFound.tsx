
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-mechanic-dark dark:to-black p-4">
      <div className="text-center max-w-md w-full auth-card animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="auth-btn inline-flex"
        >
          <ArrowLeft size={18} className="mr-2" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
