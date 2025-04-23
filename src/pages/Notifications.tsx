
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, Message } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, Send, User, Wrench, 
  ArrowLeft, Clock, Check, CheckCheck
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "sonner";

const Notifications = () => {
  const { userRole, messages, sendMessage, markAsRead, userName } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [chats, setChats] = useState<{id: string, name: string, role: string, lastMessage: string}[]>([]);
  const navigate = useNavigate();

  // Organize messages into chats
  useEffect(() => {
    const chatMap = new Map();
    
    messages.forEach(message => {
      // If we sent the message, track the receiver as the chat person
      if (message.senderId === "user12345" || message.senderId === "mech12345") {
        const chatPersonId = message.receiverId;
        const chatPersonName = userRole === "user" ? "Mike (Mechanic)" : "John (Customer)";
        const chatPersonRole = userRole === "user" ? "mechanic" : "user";
        
        if (!chatMap.has(chatPersonId)) {
          chatMap.set(chatPersonId, {
            id: chatPersonId,
            name: chatPersonName,
            role: chatPersonRole,
            lastMessage: message.content,
            timestamp: message.timestamp
          });
        } else if (new Date(message.timestamp) > new Date(chatMap.get(chatPersonId).timestamp)) {
          chatMap.get(chatPersonId).lastMessage = message.content;
          chatMap.get(chatPersonId).timestamp = message.timestamp;
        }
      }
      
      // If we received the message, track the sender as the chat person
      else {
        const chatPersonId = message.senderId;
        const chatPersonName = message.senderName;
        const chatPersonRole = message.senderRole;
        
        if (!chatMap.has(chatPersonId)) {
          chatMap.set(chatPersonId, {
            id: chatPersonId,
            name: chatPersonName,
            role: chatPersonRole as string,
            lastMessage: message.content,
            timestamp: message.timestamp
          });
        } else if (new Date(message.timestamp) > new Date(chatMap.get(chatPersonId).timestamp)) {
          chatMap.get(chatPersonId).lastMessage = message.content;
          chatMap.get(chatPersonId).timestamp = message.timestamp;
        }
      }
    });
    
    // Convert map to array and sort by timestamp
    const chatArray = Array.from(chatMap.values());
    chatArray.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setChats(chatArray);
    
    // If no chat is selected and we have chats, select the first one
    if (!selectedChat && chatArray.length > 0) {
      setSelectedChat(chatArray[0].id);
    }
  }, [messages, selectedChat, userRole]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;
    
    const selectedChatObj = chats.find(chat => chat.id === selectedChat);
    if (selectedChatObj) {
      sendMessage(selectedChat, selectedChatObj.name, messageText);
      setMessageText("");
      toast.success("Message sent", {
        description: `To: ${selectedChatObj.name}`
      });
    }
  };

  // Mark messages as read when viewed
  useEffect(() => {
    if (selectedChat) {
      messages
        .filter(msg => msg.senderId === selectedChat && !msg.read)
        .forEach(msg => markAsRead(msg.id));
    }
  }, [selectedChat, messages, markAsRead]);

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Navigate back
  const handleBack = () => {
    if (userRole === "user") {
      navigate("/user-dashboard");
    } else {
      navigate("/mechanic-dashboard");
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, selectedChat]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={handleBack} className="p-2">
              <ArrowLeft size={20} className="text-black dark:text-white" />
            </button>
            <h1 className="text-xl font-bold text-black dark:text-white">Messages</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Conversation List */}
          <div className="md:col-span-1">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm h-[calc(100vh-180px)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-black dark:text-white">Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-240px)]">
                  {chats.length > 0 ? (
                    <div className="space-y-2">
                      {chats.map((chat) => (
                        <div 
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`p-3 rounded-lg cursor-pointer ${
                            selectedChat === chat.id 
                              ? 'bg-gray-100 dark:bg-gray-800' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                                {chat.role === "user" ? <User size={16} /> : <Wrench size={16} />}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black dark:text-white truncate">
                                {chat.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {chat.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <MessageSquare size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        No conversations yet. Messages will appear here.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm h-[calc(100vh-180px)] flex flex-col">
              {selectedChat && chats.find(chat => chat.id === selectedChat) ? (
                <>
                  <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                          {chats.find(chat => chat.id === selectedChat)?.role === "user" ? 
                            <User size={16} /> : <Wrench size={16} />}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg text-black dark:text-white">
                        {chats.find(chat => chat.id === selectedChat)?.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-[calc(100vh-320px)] p-4" id="messages-container">
                      <div className="space-y-4">
                        {messages
                          .filter(msg => 
                            msg.senderId === selectedChat || msg.receiverId === selectedChat
                          )
                          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                          .map((message) => {
                            const isSentByMe = message.senderId !== selectedChat;
                            
                            return (
                              <div key={message.id} className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg p-3 ${
                                  isSentByMe 
                                    ? 'bg-black text-white dark:bg-white dark:text-black rounded-br-none' 
                                    : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100 rounded-bl-none'
                                }`}>
                                  <p className="text-sm">{message.content}</p>
                                  <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                                    isSentByMe ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500'
                                  }`}>
                                    <span>{formatTime(message.timestamp)}</span>
                                    {isSentByMe && (
                                      message.read ? 
                                        <CheckCheck size={12} className="text-green-500" /> : 
                                        <Check size={12} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </ScrollArea>
                  </CardContent>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1 min-h-[40px] max-h-[120px] text-black dark:text-white bg-white dark:bg-black"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="h-10 w-10 p-0 rounded-full"
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <MessageSquare size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a conversation to start messaging
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
