"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatientData(response.data[0]); // Get the first patient for demo
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
          </header>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                            {patientData?.firstName?.charAt(0)}{patientData?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-4">
                          Change Photo
                        </Button>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue={patientData?.firstName || "Sarah"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue={patientData?.lastName || "Johnson"} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={patientData?.email || "sarah.johnson@example.com"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={patientData?.phone || "(555) 123-4567"} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" defaultValue={patientData?.dateOfBirth || "05/12/1985"} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" defaultValue={patientData?.gender || "Female"} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue={patientData?.address || "123 Main St, Anytown, CA 12345"} />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Your health information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Allergies</h3>
                        <div className="bg-slate-50 p-4 rounded-md">
                          <p>Penicillin - Severe reaction</p>
                          <p>Peanuts - Mild reaction</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Current Medications</h3>
                        <div className="bg-slate-50 p-4 rounded-md">
                          <p>Lisinopril 10mg - Once daily</p>
                          <p>Atorvastatin 20mg - Once daily</p>
                          <p>Multivitamin - Once daily</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Past Surgeries</h3>
                        <div className="bg-slate-50 p-4 rounded-md">
                          <p>Appendectomy - 2010</p>
                          <p>Knee arthroscopy - 2015</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Family History</h3>
                        <div className="bg-slate-50 p-4 rounded-md">
                          <p>Father: Hypertension, Type 2 Diabetes</p>
                          <p>Mother: Breast cancer (age 65)</p>
                          <p>Sibling: No significant conditions</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" className="mr-2">Request Changes</Button>
                        <Button>Download Records</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Your coverage details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider">Insurance Provider</Label>
                          <Input id="provider" defaultValue="Blue Cross Blue Shield" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="planType">Plan Type</Label>
                          <Input id="planType" defaultValue="PPO" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="policyNumber">Policy Number</Label>
                          <Input id="policyNumber" defaultValue="XYZ123456789" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupNumber">Group Number</Label>
                          <Input id="groupNumber" defaultValue="GRP987654321" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="policyHolder">Policy Holder Name</Label>
                          <Input id="policyHolder" defaultValue="Sarah Johnson" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relationship to Policy Holder</Label>
                          <Input id="relationship" defaultValue="Self" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}