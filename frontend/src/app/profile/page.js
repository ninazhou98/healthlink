"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Shield, Settings } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        // Assuming the first patient in the array is the current user
        setPatient(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Could not load patient information");
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pt-4 pb-20 md:pb-8 md:ml-64">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </header>

        {loading ? (
          <p className="text-gray-500">Loading profile information...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : patient ? (
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal" className="flex items-center">
                <User size={16} className="mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center">
                <FileText size={16} className="mr-2" />
                Medical History
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <Shield size={16} className="mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings size={16} className="mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={patient.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={patient.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={patient.phone} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" defaultValue={patient.dob} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue={patient.address} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Insurance Provider</Label>
                      <Input id="insurance" defaultValue={patient.insurance} />
                    </div>
                  </div>
                  
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Allergies</h3>
                      <p className="text-gray-600">{patient.allergies || "No known allergies"}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Current Medications</h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {patient.medications?.map((med, index) => (
                          <li key={index}>{med}</li>
                        )) || <li>No current medications</li>}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Past Procedures</h3>
                      <ul className="list-disc pl-5 text-gray-600">
                        {patient.procedures?.map((procedure, index) => (
                          <li key={index}>{procedure}</li>
                        )) || <li>No past procedures</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Manage how your information is used and shared within the healthcare system.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Communication Preferences</h3>
                        <p className="text-sm text-gray-500">Receive appointment reminders and updates</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Sharing</h3>
                        <p className="text-sm text-gray-500">Control how your medical data is shared</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Account Security</h3>
                        <p className="text-sm text-gray-500">Update password and security settings</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notification Settings</h3>
                        <p className="text-sm text-gray-500">Manage email and push notifications</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Language Preferences</h3>
                        <p className="text-sm text-gray-500">Change your preferred language</p>
                      </div>
                      <Button variant="outline">Select</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Accessibility</h3>
                        <p className="text-sm text-gray-500">Adjust for better accessibility</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <p className="text-gray-500">No patient information available</p>
        )}
      </main>
    </div>
  );
}