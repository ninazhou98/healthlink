"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: "Dr. Smith",
      subject: "Lab Results Available",
      date: "May 3, 2023",
      content: "Your recent lab results are now available. Overall, everything looks good. Your cholesterol levels have improved since your last visit. Keep up the good work with your diet and exercise routine.",
      read: true
    },
    {
      id: 2,
      sender: "Dr. Johnson",
      subject: "Prescription Refill",
      date: "April 30, 2023",
      content: "I've approved your prescription refill request. You can pick it up at your pharmacy tomorrow. Let me know if you have any questions about the dosage.",
      read: true
    },
    {
      id: 3,
      sender: "Nurse Williams",
      subject: "Appointment Confirmation",
      date: "April 28, 2023",
      content: "This is a confirmation for your upcoming appointment on May 15 at 10:00 AM. Please arrive 15 minutes early to complete any necessary paperwork.",
      read: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-700">HealthLink</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Navigation />
        
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h2 className="text-2xl font-semibold text-slate-800">Messages</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Inbox
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-3 rounded-md cursor-pointer ${
                        message.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-blue-500'
                      } hover:bg-slate-100`}
                    >
                      <div className="flex justify-between">
                        <span className={`font-medium ${!message.read && 'text-blue-700'}`}>
                          {message.sender}
                        </span>
                        <span className="text-xs text-slate-500">{message.date}</span>
                      </div>
                      <p className="text-sm text-slate-700 truncate">{message.subject}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      To:
                    </label>
                    <Input placeholder="Select recipient" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Subject:
                    </label>
                    <Input placeholder="Enter subject" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Message:
                    </label>
                    <Textarea 
                      placeholder="Type your message here..." 
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}