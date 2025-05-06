"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaperPlaneIcon } from "lucide-react"

export default function MessagesPage() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  
  useEffect(() => {
    // Mock data for conversations
    const mockConversations = [
      {
        id: 1,
        with: "Dr. Sarah Johnson",
        avatar: "",
        lastMessage: "Your test results look good. Let's discuss at your next appointment.",
        date: "Today",
        unread: true,
        messages: [
          { id: 1, sender: "doctor", content: "Hello! How are you feeling today?", time: "10:30 AM" },
          { id: 2, sender: "patient", content: "I'm feeling much better, thank you!", time: "10:35 AM" },
          { id: 3, sender: "doctor", content: "That's great to hear. Your test results look good. Let's discuss at your next appointment.", time: "10:40 AM" }
        ]
      },
      {
        id: 2,
        with: "Dr. Michael Chen",
        avatar: "",
        lastMessage: "Please remember to take your medication as prescribed.",
        date: "Yesterday",
        unread: false,
        messages: [
          { id: 1, sender: "doctor", content: "Have you been taking your medication regularly?", time: "2:15 PM" },
          { id: 2, sender: "patient", content: "Yes, I've been following the schedule.", time: "2:20 PM" },
          { id: 3, sender: "doctor", content: "Please remember to take your medication as prescribed.", time: "2:25 PM" }
        ]
      },
      {
        id: 3,
        with: "Nurse Emily",
        avatar: "",
        lastMessage: "Your prescription has been renewed and sent to your pharmacy.",
        date: "May 10",
        unread: false,
        messages: [
          { id: 1, sender: "nurse", content: "I've processed your prescription renewal request.", time: "11:00 AM" },
          { id: 2, sender: "patient", content: "Thank you! When will it be ready?", time: "11:05 AM" },
          { id: 3, sender: "nurse", content: "Your prescription has been renewed and sent to your pharmacy.", time: "11:10 AM" }
        ]
      }
    ]
    
    setConversations(mockConversations)
    setSelectedConversation(mockConversations[0])
  }, [])
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return
    
    const updatedConversation = {
      ...selectedConversation,
      messages: [
        ...selectedConversation.messages,
        {
          id: selectedConversation.messages.length + 1,
          sender: "patient",
          content: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }
    
    setSelectedConversation(updatedConversation)
    setConversations(conversations.map(conv => 
      conv.id === updatedConversation.id ? updatedConversation : conv
    ))
    setNewMessage("")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">HL</span>
            </div>
            <span className="font-bold text-xl">HealthLink</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Navigation />
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Conversations</h2>
              </div>
              <div className="divide-y">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 ${selectedConversation?.id === conversation.id ? 'bg-slate-50 dark:bg-slate-900' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{conversation.with.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.with}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.date}</span>
                        </div>
                        <p className={`text-sm truncate ${conversation.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{selectedConversation.with.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold">{selectedConversation.with}</h2>
                </div>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'patient' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your message..." 
                      className="min-h-[60px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button 
                      className="self-end"
                      onClick={handleSendMessage}
                    >
                      <PaperPlaneIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}