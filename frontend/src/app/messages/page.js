"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Plus } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Primary Care",
      avatar: null,
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      unread: true,
      messages: [
        { id: 1, sender: "doctor", content: "Hello! How are you feeling today?", time: "9:30 AM" },
        { id: 2, sender: "patient", content: "Much better, thank you. The medication is helping.", time: "9:45 AM" },
        { id: 3, sender: "doctor", content: "That's great to hear! Your test results look good. Let's discuss at your next appointment.", time: "10:15 AM" },
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: null,
      lastMessage: "Remember to take your blood pressure readings daily.",
      unread: false,
      messages: [
        { id: 1, sender: "doctor", content: "How's your blood pressure been this week?", time: "Yesterday" },
        { id: 2, sender: "patient", content: "It's been stable, averaging around 120/80.", time: "Yesterday" },
        { id: 3, sender: "doctor", content: "Remember to take your blood pressure readings daily.", time: "Yesterday" },
      ]
    },
    {
      id: 3,
      name: "Nurse Williams",
      role: "Office Nurse",
      avatar: null,
      lastMessage: "Your prescription refill has been approved.",
      unread: true,
      messages: [
        { id: 1, sender: "nurse", content: "Your prescription refill has been approved.", time: "2 days ago" },
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedConversation) return;
    
    // In a real app, you would send this to an API
    console.log("Sending message:", newMessage, "to conversation:", selectedConversation);
    
    // Clear the input
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{conversation.name}</p>
                            {conversation.unread && (
                              <span className="inline-block h-2 w-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{conversation.role}</p>
                          <p className="text-sm truncate mt-1">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Thread */}
            <Card className="md:col-span-2">
              <CardHeader className="border-b">
                {selectedConversation ? (
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </CardTitle>
                      <p className="text-xs text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <CardTitle>Select a conversation</CardTitle>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {selectedConversation ? (
                  <div className="flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {conversations
                        .find(c => c.id === selectedConversation)
                        ?.messages.map((message) => (
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
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Type your message..." 
                          className="flex-1"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-gray-500">
                    Select a conversation to view messages
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}