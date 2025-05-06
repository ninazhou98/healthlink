"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Plus } from "lucide-react";

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState("");
  
  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Primary Care Physician",
      unread: true,
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      messages: [
        { id: 1, sender: "doctor", content: "Hello! How are you feeling today?", time: "10:30 AM" },
        { id: 2, sender: "patient", content: "Much better, thank you. The medication is helping.", time: "10:35 AM" },
        { id: 3, sender: "doctor", content: "That's great to hear! Your test results look good. Let's discuss at your next appointment.", time: "10:40 AM" }
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      unread: false,
      lastMessage: "Remember to take your blood pressure readings daily.",
      messages: [
        { id: 1, sender: "doctor", content: "How's your blood pressure been this week?", time: "Yesterday" },
        { id: 2, sender: "patient", content: "It's been stable, around 120/80.", time: "Yesterday" },
        { id: 3, sender: "doctor", content: "That's excellent. Remember to take your blood pressure readings daily.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Nurse Emma Wilson",
      role: "Clinic Nurse",
      unread: true,
      lastMessage: "Your prescription refill has been approved.",
      messages: [
        { id: 1, sender: "nurse", content: "Hi there! Just checking in about your prescription refill request.", time: "2 days ago" },
        { id: 2, sender: "patient", content: "Yes, I need a refill for my hypertension medication.", time: "2 days ago" },
        { id: 3, sender: "nurse", content: "Your prescription refill has been approved. You can pick it up tomorrow.", time: "1 day ago" }
      ]
    }
  ]);

  useEffect(() => {
    // Set first conversation as active by default
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;
    
    const newMessage = {
      id: activeConversation.messages.length + 1,
      sender: "patient",
      content: message,
      time: "Just now"
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessage: message
    });
    setMessage("");
  };

  const handleConversationClick = (conversation) => {
    // Mark as read when clicked
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unread: false };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(conversation);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 mt-1">Communicate with your healthcare team</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Conversations</h2>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus size={16} className="mr-2" />
              New Message
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="md:col-span-1">
              <Card className="h-[600px] overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b">
                      <Input placeholder="Search conversations..." className="w-full" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {conversations.map((conversation) => (
                        <div 
                          key={conversation.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${activeConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                          onClick={() => handleConversationClick(conversation)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {conversation.name}
                                </p>
                                {conversation.unread && (
                                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">{conversation.role}</p>
                              <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Message Thread */}
            <div className="md:col-span-2">
              <Card className="h-[600px] overflow-hidden">
                <CardContent className="p-0">
                  {activeConversation ? (
                    <div className="h-full flex flex-col">
                      <div className="p-4 border-b bg-white">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{activeConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{activeConversation.name}</p>
                            <p className="text-xs text-gray-500">{activeConversation.role}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {activeConversation.messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-3 ${
                                msg.sender === 'patient' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p>{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                              }`}>{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t bg-white">
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="Type your message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                            <Send size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}