"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  
  const conversations = [
    {
      name: "Dr. Johnson",
      role: "Primary Care",
      lastMessage: "Your lab results look good. Let's discuss at your next appointment.",
      time: "10:30 AM",
      unread: true,
      messages: [
        { sender: "Dr. Johnson", content: "Hello Sarah, I've reviewed your recent lab results.", time: "10:25 AM" },
        { sender: "Dr. Johnson", content: "Your cholesterol levels have improved since last time.", time: "10:26 AM" },
        { sender: "Dr. Johnson", content: "Your lab results look good. Let's discuss at your next appointment.", time: "10:30 AM" },
      ]
    },
    {
      name: "Nurse Williams",
      role: "Cardiology",
      lastMessage: "Your prescription refill has been approved.",
      time: "Yesterday",
      unread: false,
      messages: [
        { sender: "Nurse Williams", content: "Hi Sarah, just following up on your prescription refill request.", time: "Yesterday" },
        { sender: "Sarah", content: "Thank you for checking. I need it by this weekend.", time: "Yesterday" },
        { sender: "Nurse Williams", content: "Your prescription refill has been approved.", time: "Yesterday" },
      ]
    },
    {
      name: "Dr. Martinez",
      role: "Dermatology",
      lastMessage: "Please apply the cream twice daily and avoid sun exposure.",
      time: "Monday",
      unread: false,
      messages: [
        { sender: "Dr. Martinez", content: "How is the new treatment working for your skin condition?", time: "Monday" },
        { sender: "Sarah", content: "I'm seeing some improvement, but still have some redness.", time: "Monday" },
        { sender: "Dr. Martinez", content: "Please apply the cream twice daily and avoid sun exposure.", time: "Monday" },
      ]
    }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 flex flex-col md:flex-row md:ml-64 h-screen">
        <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 text-sm mt-1">Communicate with your healthcare team</p>
          </div>
          
          <div className="divide-y">
            {conversations.map((conversation, index) => (
              <div 
                key={index}
                className={`p-4 cursor-pointer ${selectedConversation === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => setSelectedConversation(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-3">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center">
                        {conversation.name}
                        {conversation.unread && (
                          <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500">{conversation.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-1">{conversation.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b flex items-center">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-3">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-medium">{conversations[selectedConversation].name}</h2>
              <p className="text-xs text-gray-500">{conversations[selectedConversation].role}</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {conversations[selectedConversation].messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'Sarah' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'Sarah' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'Sarah' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <Input 
                placeholder="Type your message..." 
                className="flex-1 mr-2"
              />
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}