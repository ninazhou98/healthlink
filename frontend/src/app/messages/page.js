"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, User } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("");
  
  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! I've reviewed your recent lab results and everything looks good. Do you have any questions?",
      timestamp: "Today, 10:30 AM",
      isUnread: true,
    },
    {
      id: 2,
      sender: "Nurse Michael",
      content: "Your prescription refill has been approved and sent to your pharmacy. It should be ready for pickup by tomorrow.",
      timestamp: "Yesterday, 2:15 PM",
      isUnread: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "Just following up on your last appointment. How are you feeling with the new medication?",
      timestamp: "May 2, 2023",
      isUnread: false,
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Communicate securely with your healthcare providers</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Conversations</h2>
            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className={`cursor-pointer transition-colors hover:bg-gray-50 ${message.isUnread ? 'border-l-4 border-l-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{message.sender}</h3>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.content}</p>
                    {message.isUnread && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">New</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Dr. Sarah Johnson
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col space-y-4">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%] self-start">
                    <p className="text-sm">Hello! I've reviewed your recent lab results and everything looks good. Do you have any questions?</p>
                    <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button onClick={handleSendMessage} className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}