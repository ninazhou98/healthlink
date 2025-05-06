"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User, Search } from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Primary Care Physician",
      unread: true,
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      lastMessageTime: "2 hours ago",
      messages: [
        { sender: "doctor", content: "Hello! How are you feeling today?", time: "Yesterday, 2:30 PM" },
        { sender: "patient", content: "Much better, thank you. The medication is helping with the pain.", time: "Yesterday, 3:15 PM" },
        { sender: "doctor", content: "That's great to hear! Your test results look good. Let's discuss at your next appointment.", time: "2 hours ago" }
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      unread: false,
      lastMessage: "Remember to take your blood pressure readings daily.",
      lastMessageTime: "Yesterday",
      messages: [
        { sender: "doctor", content: "I've reviewed your latest ECG results.", time: "2 days ago, 10:15 AM" },
        { sender: "doctor", content: "Everything looks stable, but I'd like to see you for a follow-up next month.", time: "2 days ago, 10:16 AM" },
        { sender: "patient", content: "That sounds good. Should I continue with the same medication?", time: "2 days ago, 11:30 AM" },
        { sender: "doctor", content: "Yes, please continue. Remember to take your blood pressure readings daily.", time: "Yesterday, 9:00 AM" }
      ]
    },
    {
      id: 3,
      name: "Nurse Emily Wilson",
      role: "Clinic Nurse",
      unread: false,
      lastMessage: "Your prescription refill has been approved.",
      lastMessageTime: "3 days ago",
      messages: [
        { sender: "nurse", content: "Hi there! Just checking in about your prescription refill request.", time: "3 days ago, 1:45 PM" },
        { sender: "patient", content: "Yes, I need a refill for my hypertension medication.", time: "3 days ago, 2:30 PM" },
        { sender: "nurse", content: "Your prescription refill has been approved. You can pick it up at your pharmacy tomorrow.", time: "3 days ago, 4:15 PM" }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, you would send this message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="md:col-span-1 overflow-hidden flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search conversations" 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-grow">
              <div className="divide-y">
                {filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{conversation.name}</p>
                          <p className="text-xs text-gray-500">{conversation.role}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{conversation.lastMessageTime}</div>
                    </div>
                    <div className="mt-2 flex items-start">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread && (
                        <span className="ml-2 bg-blue-500 rounded-full h-2 w-2"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Content */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="px-6 py-4 border-b flex flex-row items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>{selectedConversation.name}</CardTitle>
                    <p className="text-sm text-gray-500">{selectedConversation.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 overflow-y-auto flex-grow">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'patient' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Type your message..." 
                      className="resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="flex-shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
                  <p className="text-gray-500 mt-1">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}