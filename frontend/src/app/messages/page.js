"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Plus } from "lucide-react";
import Navigation from "@/components/navigation";

export default function MessagesPage() {
  const [conversations] = useState([
    { 
      id: 1, 
      name: "Dr. Sarah Smith", 
      role: "Cardiologist",
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      time: "10:30 AM",
      unread: true
    },
    { 
      id: 2, 
      name: "Dr. Michael Johnson", 
      role: "Dermatologist",
      lastMessage: "Please send a photo of how the affected area looks today.",
      time: "Yesterday",
      unread: false
    },
    { 
      id: 3, 
      name: "Nurse Williams", 
      role: "Primary Care",
      lastMessage: "Your prescription has been sent to your pharmacy.",
      time: "May 2",
      unread: false
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [messages] = useState([
    { id: 1, sender: "doctor", content: "Hello! How are you feeling today?", time: "10:15 AM" },
    { id: 2, sender: "patient", content: "I'm feeling much better, thank you. The new medication seems to be working well.", time: "10:20 AM" },
    { id: 3, sender: "doctor", content: "That's great to hear! Any side effects?", time: "10:22 AM" },
    { id: 4, sender: "patient", content: "Just a little drowsiness in the morning, but it goes away after an hour or so.", time: "10:25 AM" },
    { id: 5, sender: "doctor", content: "Your test results look good. Let's discuss at your next appointment.", time: "10:30 AM" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-600">Messages</h1>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 mb-16 md:mb-0">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Conversations List */}
          <div className="w-full md:w-1/3">
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search messages" className="pl-8" />
              </div>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <Card 
                  key={conversation.id} 
                  className={`cursor-pointer ${conversation.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{conversation.role}</p>
                      <p className="text-sm truncate">{conversation.lastMessage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Message Thread */}
          <div className="w-full md:w-2/3 bg-white rounded-lg border border-gray-200 flex flex-col h-[600px]">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{activeConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeConversation.name}</h3>
                      <p className="text-xs text-gray-500">{activeConversation.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'patient' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message..." 
                      className="min-h-[60px] resize-none"
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700 self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
}