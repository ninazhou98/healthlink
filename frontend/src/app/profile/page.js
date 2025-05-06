"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, FileText, Bell } from "lucide-react";

export default function ProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345"
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">HealthLink</h1>
          <p className="text-slate-600">Your patient communication portal</p>
        </header>
        
        <Navigation />
        
        <Card>
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-xl text-slate-800">Patient Profile</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="medical" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Medical History
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={personalInfo.firstName} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={personalInfo.lastName} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={personalInfo.email} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={personalInfo.phone} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      type="date" 
                      value={personalInfo.dateOfBirth} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={personalInfo.address} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={personalInfo.city} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={personalInfo.state} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      value={personalInfo.zipCode} 
                      onChange={handlePersonalInfoChange} 
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="medical">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Medical Conditions</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="text-slate-500">No medical conditions on record.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Medications</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Lisinopril 10mg</span>
                          <span className="text-slate-500">Once daily</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Metformin 500mg</span>
                          <span className="text-slate-500">Twice daily</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Allergies</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <ul className="space-y-2">
                        <li>Penicillin</li>
                        <li>Peanuts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="mt-1" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <p className="mb-4">Enhance your account security by enabling two-factor authentication.</p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">Appointment Reminders</h3>
                        <p className="text-sm text-slate-500">Receive notifications about upcoming appointments</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="appointmentEmail" className="text-sm">Email</Label>
                        <Input id="appointmentEmail" type="checkbox" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="appointmentSMS" className="text-sm">SMS</Label>
                        <Input id="appointmentSMS" type="checkbox" className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">Medication Reminders</h3>
                        <p className="text-sm text-slate-500">Receive reminders to take your medication</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="medicationEmail" className="text-sm">Email</Label>
                        <Input id="medicationEmail" type="checkbox" className="h-4 w-4" />
                        <Label htmlFor="medicationSMS" className="text-sm">SMS</Label>
                        <Input id="medicationSMS" type="checkbox" className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">New Messages</h3>
                        <p className="text-sm text-slate-500">Get notified when you receive new messages</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="messagesEmail" className="text-sm">Email</Label>
                        <Input id="messagesEmail" type="checkbox" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="messagesSMS" className="text-sm">SMS</Label>
                        <Input id="messagesSMS" type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}