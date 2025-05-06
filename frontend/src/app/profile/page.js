"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatient(response.data[0]); // Just use the first patient for demo
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Your Profile</h1>
            <p className="text-slate-500 mt-2">Manage your personal information and preferences</p>
          </header>

          {loading ? (
            <div className="space-y-6">
              <Card className="animate-pulse">
                <CardHeader>
                  <div className="h-7 bg-slate-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-10 bg-slate-200 rounded"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue={patient?.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue={patient?.lastName} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={patient?.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue={patient?.phone} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={patient?.address} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue={patient?.city} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue={patient?.state} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input id="zipCode" defaultValue={patient?.zipCode} />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>View and update your medical information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Allergies</h3>
                        <p className="text-slate-500">{patient?.allergies || "No known allergies"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Current Medications</h3>
                        <ul className="list-disc pl-5 text-slate-500">
                          {patient?.medications?.length > 0 ? (
                            patient.medications.map((med, index) => (
                              <li key={index}>{med}</li>
                            ))
                          ) : (
                            <li>No current medications</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Medical Conditions</h3>
                        <ul className="list-disc pl-5 text-slate-500">
                          {patient?.conditions?.length > 0 ? (
                            patient.conditions.map((condition, index) => (
                              <li key={index}>{condition}</li>
                            ))
                          ) : (
                            <li>No medical conditions on record</li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Request Medical Records Update</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Manage your insurance details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                          <Input id="insuranceProvider" defaultValue={patient?.insurance?.provider} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policyNumber">Policy Number</Label>
                          <Input id="policyNumber" defaultValue={patient?.insurance?.policyNumber} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupNumber">Group Number</Label>
                          <Input id="groupNumber" defaultValue={patient?.insurance?.groupNumber} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policyHolder">Policy Holder Name</Label>
                          <Input id="policyHolder" defaultValue={patient?.insurance?.policyHolder} />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Update Insurance Information</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="emailNotifications" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="emailNotifications">Email notifications for appointments</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="smsNotifications" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="smsNotifications">SMS reminders for appointments</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="newsletterSubscription" className="h-4 w-4" />
                        <Label htmlFor="newsletterSubscription">Subscribe to health newsletter</Label>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Save Preferences</Button>
                      </div>
                    </form>
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