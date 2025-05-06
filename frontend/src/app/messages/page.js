"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Send, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Primary Care Physician",
      avatar: "SJ",
      lastMessage: "Your test results look good. Let's discuss at your next appointment.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "MC",
      lastMessage: "Remember to take your medication as prescribed.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Dermatologist",
      avatar: "ER",
      lastMessage: "Please send photos of how the treatment is progressing.",
      time: "Monday",
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      conversationId: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! How are you feeling today?",
      time: "10:15 AM",
      isPatient: false,
    },
    {
      id: 2,
      conversationId: 1,
      sender: "You",
      content: "I'm feeling much better, thank you. The new medication seems to be working.",
      time: "10:20 AM",
      isPatient: true,
    },
    {
      id: 3,
      conversationId: 1,
      sender: "Dr. Sarah Johnson",
      content: "That's great to hear! Your test results look good. Let's discuss at your next appointment.",
      time: "10:30 AM",
      isPatient: false,
    },
  ];

  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const conversationMessages = messages.filter(
    message => message.conversationId === activeConversation?.id
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 flex">
        <div className="w-full md:w-80 lg:w-96 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search conversations" 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-180px)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${
                    activeConversation?.id === conversation.id ? "bg-slate-50" : ""
                  }`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {conversation.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <span className="text-xs text-slate-500">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-slate-500">{conversation.role}</p>
                      <p className="text-sm truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">
                No conversations found
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <Button className="w-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              <div className="p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {activeConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-slate-500">{activeConversation.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {conversationMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isPatient ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isPatient 
                            ? "bg-blue-600 text-white" 
                            : "bg-white border text-slate-900"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isPatient ? "text-blue-100" : "text-slate-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[60px]"
                  />
                  <Button className="flex-shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                <p className="text-slate-500 mb-4">Choose a conversation from the list or start a new one</p>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MessageSquare(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}