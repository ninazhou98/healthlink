"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, FileText, Bell } from "lucide-react";

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
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Saving profile:", personalInfo);
    // Show success message
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="personal" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Medical</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={personalInfo.firstName} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={personalInfo.lastName} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={personalInfo.email} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={personalInfo.phone} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input 
                        id="dateOfBirth" 
                        name="dateOfBirth" 
                        type="date" 
                        value={personalInfo.dateOfBirth} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={personalInfo.address} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={personalInfo.city} 
                        onChange={handlePersonalInfoChange} 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={personalInfo.state} 
                          onChange={handlePersonalInfoChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={personalInfo.zipCode} 
                          onChange={handlePersonalInfoChange} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Your medical information is private and secure.</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Allergies</h3>
                    <p>Penicillin, Peanuts</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Current Medications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Lisinopril 10mg - Once daily</li>
                      <li>Atorvastatin 20mg - Once daily</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Medical Conditions</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Hypertension</li>
                      <li>High Cholesterol</li>
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">Request Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Appointment Reminders</h3>
                      <p className="text-sm text-gray-500">Receive notifications about upcoming appointments</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="appointment-email">Email</Label>
                      <Input type="checkbox" id="appointment-email" className="w-4 h-4" defaultChecked />
                      <Label htmlFor="appointment-sms">SMS</Label>
                      <Input type="checkbox" id="appointment-sms" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Prescription Refills</h3>
                      <p className="text-sm text-gray-500">Receive notifications when prescriptions are ready</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="prescription-email">Email</Label>
                      <Input type="checkbox" id="prescription-email" className="w-4 h-4" defaultChecked />
                      <Label htmlFor="prescription-sms">SMS</Label>
                      <Input type="checkbox" id="prescription-sms" className="w-4 h-4" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Test Results</h3>
                      <p className="text-sm text-gray-500">Receive notifications when new test results are available</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="results-email">Email</Label>
                      <Input type="checkbox" id="results-email" className="w-4 h-4" defaultChecked />
                      <Label htmlFor="results-sms">SMS</Label>
                      <Input type="checkbox" id="results-sms" className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}