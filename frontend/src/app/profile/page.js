"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Shield, FileText, Settings } from "lucide-react";

export default function ProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345"
  });

  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "HealthPlus Insurance",
    policyNumber: "HP-12345678",
    groupNumber: "GRP-987654",
    primaryInsured: "Self",
    relationship: "Self",
    effectiveDate: "2023-01-01",
    expirationDate: "2023-12-31"
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInsuranceInfoChange = (e) => {
    const { name, value } = e.target;
    setInsuranceInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>
      </header>
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Profile Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{personalInfo.firstName} {personalInfo.lastName}</h2>
                    <p className="text-gray-500 text-sm">{personalInfo.email}</p>
                    <p className="text-gray-500 text-sm">{personalInfo.phone}</p>
                    
                    <div className="w-full mt-6 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <User size={16} className="mr-2" />
                        Personal Info
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield size={16} className="mr-2" />
                        Insurance
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText size={16} className="mr-2" />
                        Medical Records
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings size={16} className="mr-2" />
                        Account Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile Details */}
            <div className="md:col-span-3">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              value={personalInfo.city} 
                              onChange={handlePersonalInfoChange}
                            />
                          </div>
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
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insurance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Insurance Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="provider">Insurance Provider</Label>
                          <Input 
                            id="provider" 
                            name="provider" 
                            value={insuranceInfo.provider} 
                            onChange={handleInsuranceInfoChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="policyNumber">Policy Number</Label>
                            <Input 
                              id="policyNumber" 
                              name="policyNumber" 
                              value={insuranceInfo.policyNumber} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupNumber">Group Number</Label>
                            <Input 
                              id="groupNumber" 
                              name="groupNumber" 
                              value={insuranceInfo.groupNumber} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="primaryInsured">Primary Insured</Label>
                            <Input 
                              id="primaryInsured" 
                              name="primaryInsured" 
                              value={insuranceInfo.primaryInsured} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="relationship">Relationship to Patient</Label>
                            <Input 
                              id="relationship" 
                              name="relationship" 
                              value={insuranceInfo.relationship} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="effectiveDate">Effective Date</Label>
                            <Input 
                              id="effectiveDate" 
                              name="effectiveDate" 
                              type="date" 
                              value={insuranceInfo.effectiveDate} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiration Date</Label>
                            <Input 
                              id="expirationDate" 
                              name="expirationDate" 
                              type="date" 
                              value={insuranceInfo.expirationDate} 
                              onChange={handleInsuranceInfoChange}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}