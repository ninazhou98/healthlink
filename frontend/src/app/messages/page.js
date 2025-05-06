"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, PaperclipIcon } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  
  // Mock conversation data
  const conversations = [
    { 
      id: 1, 
      name: "Dr. Smith", 
      role: "Primary Care", 
      lastMessage: "Your test results look good. Let me know if you have any questions.",
      time: "10:30 AM",
      unread: true,
      avatar: "S"
    },
    { 
      id: 2, 
      name: "Nurse Williams", 
      role: "Cardiology", 
      lastMessage: "Don't forget to take your medication as prescribed.",
      time: "Yesterday",
      unread: false,
      avatar: "W"
    },
    { 
      id: 3, 
      name: "Dr. Johnson", 
      role: "Dermatology", 
      lastMessage: "Please send a photo of how the rash is healing.",
      time: "May 10",
      unread: false,
      avatar: "J"
    }
  ];
  
  // Mock messages for the selected conversation
  const messageHistory = [
    { id: 1, sender: "provider", text: "Hello Sarah, how are you feeling today?", time: "10:15 AM" },
    { id: 2, sender: "patient", text: "I'm feeling much better, thank you! The new medication seems to be working.", time: "10:20 AM" },
    { id: 3, sender: "provider", text: "That's great to hear! Your test results look good as well. Let me know if you have any questions.", time: "10:30 AM" }
  ];
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the API
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r border-gray-200">
          <Navigation />
        </aside>
        
        <main className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 border-r border-gray-200 bg-white">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Search conversations" className="pl-10" />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-13rem)] md:h-[calc(100vh-8rem)]">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{conversation.role}</p>
                      <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col bg-white">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.role}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messageHistory.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[75%] rounded-lg p-3 ${
                          msg.sender === 'patient' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                        }`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="shrink-0">
                      <PaperclipIcon size={18} />
                    </Button>
                    <Textarea 
                      placeholder="Type your message..." 
                      className="min-h-[2.5rem] max-h-32"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="shrink-0" 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send size={18} className="mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}