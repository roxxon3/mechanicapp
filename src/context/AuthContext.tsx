
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "user" | "mechanic" | null;

// Define message structure
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userId: string;
  userName: string;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  messages: Message[];
  sendMessage: (receiverId: string, receiverName: string, content: string) => void;
  getUnreadCount: () => number;
  markAsRead: (messageId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole") as UserRole;
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    const storedMessages = localStorage.getItem("messages");
    
    if (storedAuth === "true" && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserId(storedUserId || generateUserId());
      setUserName(storedUserName || (storedRole === "user" ? "John" : "Mike"));
    }

    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error("Error parsing stored messages", error);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  const generateUserId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const login = (role: UserRole, name?: string) => {
    const newUserId = generateUserId();
    const defaultName = role === "user" ? "John" : "Mike";
    const userName = name || defaultName;

    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(newUserId);
    setUserName(userName);
    
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role || "");
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("userName", userName);

    // Add demo messages for testing
    if (role === "user") {
      const demoMechanicId = "mech12345";
      setMessages([
        {
          id: "msg1",
          senderId: demoMechanicId,
          receiverId: newUserId,
          senderName: "Mike (Mechanic)",
          senderRole: "mechanic",
          content: "Hello! I can help with your car issues.",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          read: false
        }
      ]);
    } else if (role === "mechanic") {
      const demoUserId = "user12345";
      setMessages([
        {
          id: "msg2",
          senderId: demoUserId,
          receiverId: newUserId,
          senderName: "John (Customer)",
          senderRole: "user",
          content: "My car won't start. Can you help?",
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          read: false
        }
      ]);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId("");
    setUserName("");
    setMessages([]);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("messages");
  };

  const sendMessage = (receiverId: string, receiverName: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: userId,
      receiverId,
      senderName: userName + (userRole === "user" ? " (Customer)" : " (Mechanic)"),
      senderRole: userRole,
      content,
      timestamp: new Date(),
      read: false
    };

    // Add a reply message for demo purposes
    const replyMessage: Message = {
      id: `msg-reply-${Date.now()}`,
      senderId: receiverId,
      receiverId: userId,
      senderName: receiverName,
      senderRole: userRole === "user" ? "mechanic" : "user",
      content: userRole === "user" 
        ? "Thanks for your message. I'll check your car issue soon." 
        : "Thank you for the response. When can you come to fix my car?",
      timestamp: new Date(Date.now() + 60000), // 1 minute later
      read: false
    };

    setMessages(prevMessages => [...prevMessages, newMessage, replyMessage]);
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.read && msg.receiverId === userId).length;
  };

  const markAsRead = (messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole, 
        userId,
        userName,
        login, 
        logout,
        messages,
        sendMessage,
        getUnreadCount,
        markAsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
