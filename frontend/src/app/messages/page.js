"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Send, Search } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  
  const conversations = [
    {
      id: 0,
      name: "Dr. Johnson",
      role: "Primary Care",
      avatar: "J",
      unread: true,
      lastMessage: "Your lab results look good. Let me know if you have questions.",
      messages: [
        { sender: "doctor", content: "Hello Sarah, I've reviewed your recent lab results.", time: "10:30 AM" },
        { sender: "doctor", content: "Your cholesterol levels have improved since your last visit. Keep up the good work with your diet changes!", time: "10:31 AM" },
        { sender: "patient", content: "That's great news! I've been trying to eat more vegetables and less processed food.", time: "10:45 AM" },
        { sender: "doctor", content: "Your lab results look good. Let me know if you have questions.", time: "11:02 AM" },
      ]
    },
    {
      id: 1,
      name: "Dr. Smith",
      role: "Dentist",
      avatar: "S",
      unread: false,
      lastMessage: "Don't forget your 6-month cleaning next month.",
      messages: [
        { sender: "doctor", content: "Hi Sarah, just a reminder about your upcoming dental cleaning.", time: "Yesterday" },
        { sender: "doctor", content: "Don't forget your 6-month cleaning next month.", time: "Yesterday" },
      ]
    },
    {
      id: 2,
      name: "Nurse Williams",
      role: "Cardiology Dept.",
      avatar: "W",
      unread: false,
      lastMessage: "Your prescription has been sent to your pharmacy.",
      messages: [
        { sender: "doctor", content: "Hello Sarah, I wanted to let you know that Dr. Garcia has sent your prescription to your pharmacy.", time: "Monday" },
        { sender: "patient", content: "Thank you for letting me know. Which pharmacy was it sent to?", time: "Monday" },
        { sender: "doctor", content: "Your prescription has been sent to your pharmacy.", time: "Monday" },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-80 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900">Messages</h1>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search conversations" className="pl-8" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${selectedConversation === conversation.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">{conversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversation.name}</p>
                      {conversation.unread && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{conversation.role}</p>
                    <p className="text-sm text-slate-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex flex-1 flex-col">
          {selectedConversation !== null ? (
            <>
              <div className="p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {conversations[selectedConversation].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{conversations[selectedConversation].name}</p>
                    <p className="text-xs text-slate-500">{conversations[selectedConversation].role}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[selectedConversation].messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'patient' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'patient' ? 'text-blue-100' : 'text-slate-500'
                      }`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[60px] resize-none"
                  />
                  <Button size="icon" className="h-[60px] w-[60px]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-900">Select a conversation</h3>
                <p className="text-slate-500 mt-1">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile view - show only conversation list or message thread */}
        <div className="md:hidden flex-1 flex flex-col">
          {selectedConversation === null ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-900">Select a conversation</h3>
                <p className="text-slate-500 mt-1">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedConversation(null)}
                  >
                    Back
                  </Button>
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {conversations[selectedConversation].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{conversations[selectedConversation].name}</p>
                    <p className="text-xs text-slate-500">{conversations[selectedConversation].role}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[selectedConversation].messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'patient' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'patient' ? 'text-blue-100' : 'text-slate-500'
                      }`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[60px] resize-none"
                  />
                  <Button size="icon" className="h-[60px] w-[60px]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}