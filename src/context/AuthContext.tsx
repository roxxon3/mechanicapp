
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define message type
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Define auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  userRole: "user" | "mechanic" | null;
  messages: Message[];
  vehiclePhotos: string[];
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  getUnreadCount: () => number;
  sendMessage: (receiverId: string, receiverName: string, content: string) => void;
  markAsRead: (messageId: string) => void;
  addVehiclePhoto: (photoUrl: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userName: "",
  userRole: null,
  messages: [],
  vehiclePhotos: [],
  login: () => {},
  signup: () => {},
  logout: () => {},
  getUnreadCount: () => 0,
  sendMessage: () => {},
  markAsRead: () => {},
  addVehiclePhoto: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<"user" | "mechanic" | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    const savedMessages = localStorage.getItem("messages");
    const savedPhotos = localStorage.getItem("vehiclePhotos");
    
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserName(authData.userName);
      setUserRole(authData.userRole);
    }
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add some initial messages if none exist
      const initialMessages: Message[] = [
        {
          id: "msg1",
          senderId: userRole === "user" ? "mech12345" : "user12345",
          senderName: userRole === "user" ? "Mike (Mechanic)" : "John (Customer)",
          senderRole: userRole === "user" ? "mechanic" : "user",
          receiverId: userRole === "user" ? "user12345" : "mech12345",
          content: "Hello, I'm available to help with your vehicle issue.",
          timestamp: new Date(),
          read: false,
        },
      ];
      setMessages(initialMessages);
      localStorage.setItem("messages", JSON.stringify(initialMessages));
    }
    
    if (savedPhotos) {
      setVehiclePhotos(JSON.parse(savedPhotos));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);
  
  // Save vehicle photos to localStorage whenever they change
  useEffect(() => {
    if (vehiclePhotos.length > 0) {
      localStorage.setItem("vehiclePhotos", JSON.stringify(vehiclePhotos));
    }
  }, [vehiclePhotos]);

  const login = (email: string, password: string) => {
    // Simple mock login - in production, you'd validate against a backend
    if (password === "password") {
      const userRole = email.includes("mechanic") ? "mechanic" : "user";
      const userName = userRole === "mechanic" ? "Mike" : "John";
      
      // Save auth state to localStorage
      const authData = { userName, userRole };
      localStorage.setItem("auth", JSON.stringify(authData));
      
      setIsAuthenticated(true);
      setUserName(userName);
      setUserRole(userRole);
      
      if (userRole === "mechanic") {
        navigate("/mechanic-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  };

  const signup = (name: string, email: string, password: string) => {
    // Simple mock signup - in production, you'd send to a backend
    const userRole = email.includes("mechanic") ? "mechanic" : "user";
    
    // Save auth state to localStorage
    const authData = { userName: name, userRole };
    localStorage.setItem("auth", JSON.stringify(authData));
    
    setIsAuthenticated(true);
    setUserName(name);
    setUserRole(userRole);
    
    if (userRole === "mechanic") {
      navigate("/mechanic-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUserName("");
    setUserRole(null);
    navigate("/login");
  };

  const getUnreadCount = () => {
    return messages.filter(msg => 
      ((userRole === "user" && msg.senderId === "mech12345") || 
       (userRole === "mechanic" && msg.senderId === "user12345")) && 
      !msg.read
    ).length;
  };

  const sendMessage = (receiverId: string, receiverName: string, content: string) => {
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: userRole === "user" ? "user12345" : "mech12345",
      senderName: userName,
      senderRole: userRole,
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const markAsRead = (messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };
  
  const addVehiclePhoto = (photoUrl: string) => {
    setVehiclePhotos(prev => [photoUrl, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userName, 
      userRole, 
      messages, 
      vehiclePhotos,
      login, 
      signup, 
      logout, 
      getUnreadCount,
      sendMessage,
      markAsRead,
      addVehiclePhoto
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
