"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Mail, Home, FileText, Shield } from "lucide-react";
import Navigation from "@/components/navigation";

export default function ProfilePage() {
  const [profile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    dob: "1985-06-15",
    address: "123 Main Street, Anytown, CA 12345",
    insurance: "HealthPlus Insurance",
    policyNumber: "HP12345678",
    primaryCare: "Dr. Emily Davis"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-600">My Profile</h1>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 mb-16 md:mb-0">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-gray-500">Patient ID: 12345678</p>
                  <Button className="mt-4 w-full">Edit Profile</Button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{profile.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{profile.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{profile.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="medical" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primaryCare">Primary Care Physician</Label>
                        <Input id="primaryCare" value={profile.primaryCare} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" value={profile.dob} readOnly />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input id="allergies" placeholder="No allergies recorded" />
                    </div>
                    
                    <div>
                      <Label htmlFor="medications">Current Medications</Label>
                      <Input id="medications" placeholder="No medications recorded" />
                    </div>
                    
                    <Button className="mt-2">Update Medical Information</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insurance Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="insurance">Insurance Provider</Label>
                        <Input id="insurance" value={profile.insurance} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input id="policyNumber" value={profile.policyNumber} readOnly />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input id="groupNumber" placeholder="Enter group number" />
                      </div>
                      <div>
                        <Label htmlFor="effectiveDate">Effective Date</Label>
                        <Input id="effectiveDate" type="date" />
                      </div>
                    </div>
                    
                    <Button className="mt-2">Update Insurance Information</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="password">Change Password</Label>
                      <Input id="password" type="password" placeholder="Enter new password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Communication Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="emailNotifications" className="rounded text-blue-600" />
                          <Label htmlFor="emailNotifications">Email notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="smsNotifications" className="rounded text-blue-600" />
                          <Label htmlFor="smsNotifications">SMS notifications</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-2">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
}