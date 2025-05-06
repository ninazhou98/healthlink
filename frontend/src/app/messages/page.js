"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, User } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">HealthLink</h1>
          <p className="text-slate-600">Your patient communication portal</p>
        </header>
        
        <Navigation />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="text-lg text-green-700">Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors bg-white">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Dr. Sarah Johnson</p>
                      <p className="text-sm text-slate-500 truncate">Your lab results are ready for review</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors bg-slate-100">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Dr. Michael Chen</p>
                      <p className="text-sm text-slate-500 truncate">Follow-up on your recent visit</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-slate-500 truncate">Your appointment is scheduled for tomorrow</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-green-50 border-b">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-700">Dr. Michael Chen</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                      <p className="text-sm font-medium text-slate-900">Dr. Michael Chen</p>
                      <p className="text-slate-700">Hello! How are you feeling after our last appointment?</p>
                      <p className="text-xs text-slate-500 mt-1">10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-blue-50 p-3 rounded-lg shadow-sm max-w-[80%]">
                      <p className="text-slate-700">I'm feeling much better, thank you! The medication has been helping.</p>
                      <p className="text-xs text-slate-500 mt-1">10:45 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                      <p className="text-sm font-medium text-slate-900">Dr. Michael Chen</p>
                      <p className="text-slate-700">That's great to hear! Any side effects from the medication?</p>
                      <p className="text-xs text-slate-500 mt-1">11:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-blue-50 p-3 rounded-lg shadow-sm max-w-[80%]">
                      <p className="text-slate-700">No side effects so far. When should I schedule my follow-up?</p>
                      <p className="text-xs text-slate-500 mt-1">11:15 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <div className="p-4 border-t bg-white">
                <div className="flex space-x-2">
                  <Textarea placeholder="Type your message..." className="min-h-[60px]" />
                  <Button size="icon" className="h-[60px] w-[60px] bg-green-600 hover:bg-green-700">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}