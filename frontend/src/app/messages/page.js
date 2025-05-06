"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Search } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Dr. Smith",
      role: "Primary Care",
      lastMessage: "Your test results are ready",
      time: "10:30 AM",
      unread: true,
      messages: [
        { id: 1, sender: "Dr. Smith", content: "Hello! I've reviewed your recent lab work.", time: "10:15 AM" },
        { id: 2, sender: "Dr. Smith", content: "Your test results are ready. Everything looks good!", time: "10:30 AM" }
      ]
    },
    {
      id: 2,
      name: "Reception",
      role: "Front Desk",
      lastMessage: "Appointment confirmation",
      time: "Yesterday",
      unread: false,
      messages: [
        { id: 1, sender: "Reception", content: "Your appointment has been confirmed for May 15th at 10:00 AM.", time: "Yesterday" },
        { id: 2, sender: "You", content: "Thank you! I'll be there.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Dr. Johnson",
      role: "Specialist",
      lastMessage: "Follow-up appointment",
      time: "May 1",
      unread: false,
      messages: [
        { id: 1, sender: "Dr. Johnson", content: "I'd like to schedule a follow-up appointment to check your progress.", time: "May 1" },
        { id: 2, sender: "You", content: "That sounds good. When would be a good time?", time: "May 1" },
        { id: 3, sender: "Dr. Johnson", content: "How about next week? Tuesday or Thursday afternoon?", time: "May 1" }
      ]
    }
  ];

  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedConversation) return;
    
    // In a real app, you would send this to an API
    console.log("Sending message:", newMessage, "to:", selectedConversation.name);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        <p className="text-sm text-gray-500">Your healthcare connection</p>
      </header>

      <div className="flex flex-1">
        <Navigation />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <h2 className="text-2xl font-semibold mb-6">Messages</h2>
          
          <div className="flex h-[calc(100vh-220px)] border rounded-lg overflow-hidden bg-white">
            {/* Conversations sidebar */}
            <div className="w-full md:w-1/3 border-r">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search conversations" 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-56px)]">
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{conversation.role}</p>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread && (
                      <div className="mt-1 flex">
                        <span className="bg-blue-500 rounded-full h-2 w-2"></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message content */}
            <div className="hidden md:flex flex-col flex-1">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b">
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedConversation.role}</p>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto">
                    {selectedConversation.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`mb-4 max-w-[80%] ${message.sender === "You" ? "ml-auto" : ""}`}
                      >
                        <div className={`p-3 rounded-lg ${
                          message.sender === "You" 
                            ? "bg-blue-500 text-white" 
                            : "bg-gray-100"
                        }`}>
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 text-gray-500 ${
                          message.sender === "You" ? "text-right" : ""
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t">
                    <div className="flex">
                      <Textarea 
                        placeholder="Type your message..." 
                        className="resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        className="ml-2 bg-blue-600 hover:bg-blue-700" 
                        onClick={handleSendMessage}
                      >
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
      </div>
    </div>
  );
}