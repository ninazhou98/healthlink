"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ArrowLeft, FileText, Activity, Shield } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function ProfilePage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      }
    };
    
    fetchPatientData();
  }, []);

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
          <h2 className="text-2xl font-semibold text-slate-800">My Health Profile</h2>
        </div>
        
        {loading ? (
          <p className="text-slate-500">Loading profile information...</p>
        ) : (
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Medical History
              </TabsTrigger>
              <TabsTrigger value="vitals" className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Vitals & Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Full Name
                        </label>
                        <Input defaultValue="John Smith" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Date of Birth
                        </label>
                        <Input defaultValue="05/12/1985" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Phone Number
                        </label>
                        <Input defaultValue="(555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Email Address
                        </label>
                        <Input defaultValue="john.smith@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Address
                        </label>
                        <Input defaultValue="123 Main St, Anytown, CA 12345" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Emergency Contact
                        </label>
                        <Input defaultValue="Jane Smith - (555) 987-6543" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Allergies</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Penicillin</li>
                        <li>Peanuts</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Current Medications</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Lisinopril 10mg - Once daily</li>
                        <li>Atorvastatin 20mg - Once daily</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Past Surgeries</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Appendectomy - 2010</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Family History</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Hypertension - Father</li>
                        <li>Type 2 Diabetes - Mother</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Vitals & Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recent Vitals</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Blood Pressure</span>
                          <span className="font-medium">120/80 mmHg</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Heart Rate</span>
                          <span className="font-medium">72 bpm</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Weight</span>
                          <span className="font-medium">175 lbs</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Height</span>
                          <span className="font-medium">5'10"</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">BMI</span>
                          <span className="font-medium">25.1</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Lab Results</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Cholesterol (Total)</span>
                          <span className="font-medium">185 mg/dL</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">HDL</span>
                          <span className="font-medium">55 mg/dL</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">LDL</span>
                          <span className="font-medium">110 mg/dL</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                          <span className="text-slate-700">Glucose</span>
                          <span className="font-medium">92 mg/dL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}