"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      role: "Primary Care Physician",
      avatar: "/avatar-1.png",
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      time: "10:30 AM",
      unread: true,
      messages: [
        { sender: "them", content: "Hello John, I've reviewed your recent lab results.", time: "10:15 AM" },
        { sender: "them", content: "Your test results look good. Let's discuss at your next appointment.", time: "10:30 AM" },
      ]
    },
    {
      id: 2,
      name: "Nurse Johnson",
      role: "Clinic Nurse",
      avatar: "/avatar-2.png",
      lastMessage: "Reminder about your medication refill next week.",
      time: "Yesterday",
      unread: false,
      messages: [
        { sender: "them", content: "Hi John, just checking in about your medication.", time: "Yesterday" },
        { sender: "them", content: "Reminder about your medication refill next week.", time: "Yesterday" },
        { sender: "me", content: "Thanks for the reminder. I'll take care of it.", time: "Yesterday" },
      ]
    },
    {
      id: 3,
      name: "Dr. Michael Lee",
      role: "Cardiologist",
      avatar: "/avatar-3.png",
      lastMessage: "Please complete the heart health questionnaire before your visit.",
      time: "Monday",
      unread: false,
      messages: [
        { sender: "them", content: "Hello John, I'm looking forward to your appointment next month.", time: "Monday" },
        { sender: "them", content: "Please complete the heart health questionnaire before your visit.", time: "Monday" },
        { sender: "me", content: "Will do, thank you.", time: "Monday" },
      ]
    }
  ];

  const activeConversation = conversations[selectedConversation];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">HealthLink</h1>
          <p className="text-sm text-gray-500">Patient Communication Portal</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Messages</h2>
          
          <div className="flex flex-col md:flex-row h-[600px] bg-white rounded-lg shadow overflow-hidden">
            {/* Conversation List */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search messages" 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(600px-65px)]">
                {conversations.map((conversation, index) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation === index ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedConversation(index)}
                  >
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{conversation.name}</p>
                          <p className="text-xs text-gray-500">{conversation.time}</p>
                        </div>
                        <p className="text-xs text-gray-500">{conversation.role}</p>
                        <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Content */}
            <div className="flex flex-col w-full md:w-2/3">
              <div className="p-4 border-b bg-white">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{activeConversation.name}</p>
                    <p className="text-xs text-gray-500">{activeConversation.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {activeConversation.messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'them' && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div 
                        className={`rounded-lg px-4 py-2 max-w-xs ${
                          message.sender === 'me' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-white border-t">
                <div className="flex items-end">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="flex-1 resize-none"
                    rows={2}
                  />
                  <Button className="ml-2 h-10 w-10 p-0 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <p>Messages are secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}