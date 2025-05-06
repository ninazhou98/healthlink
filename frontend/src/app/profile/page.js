"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPatientData() {
      try {
        const response = await fetch('/api/patients');
        const data = await response.json();
        // In a real app, we would fetch the specific patient
        // For now, we'll use mock data
        setPatient({
          id: "123456",
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "(555) 123-4567",
          dob: "1985-06-15",
          address: "123 Main St, Anytown, CA 12345",
          insurance: {
            provider: "Blue Cross Blue Shield",
            policyNumber: "BCBS-12345678",
            groupNumber: "GRP-987654"
          },
          emergencyContact: {
            name: "Michael Johnson",
            relationship: "Spouse",
            phone: "(555) 987-6543"
          }
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    }
    
    fetchPatientData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HealthLink</h1>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r border-gray-200">
          <Navigation />
        </aside>
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h2>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          
          {patient && (
            <>
              <div className="mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="text-2xl">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold">{patient.name}</h3>
                        <p className="text-gray-500">Patient ID: {patient.id}</p>
                        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                          <Button variant="outline" size="sm">Upload Photo</Button>
                          <Button variant="outline" size="sm">Edit Profile</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={patient.name} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={patient.email} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={patient.phone} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" value={patient.dob} readOnly />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" value={patient.address} readOnly />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Edit Information</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insurance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Insurance Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider">Insurance Provider</Label>
                          <Input id="provider" value={patient.insurance.provider} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policy">Policy Number</Label>
                          <Input id="policy" value={patient.insurance.policyNumber} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group">Group Number</Label>
                          <Input id="group" value={patient.insurance.groupNumber} readOnly />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Update Insurance</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="emergency">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ec-name">Contact Name</Label>
                          <Input id="ec-name" value={patient.emergencyContact.name} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relationship</Label>
                          <Input id="relationship" value={patient.emergencyContact.relationship} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ec-phone">Phone Number</Label>
                          <Input id="ec-phone" value={patient.emergencyContact.phone} readOnly />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Update Contact</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
      
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}