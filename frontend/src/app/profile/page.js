"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    insurance: {
      provider: "HealthPlus Insurance",
      policyNumber: "HP12345678",
      groupNumber: "GP987654",
      effectiveDate: "2023-01-01"
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "(555) 987-6543"
    }
  })
  
  const handleInputChange = (section, field, value) => {
    if (section) {
      setProfile({
        ...profile,
        [section]: {
          ...profile[section],
          [field]: value
        }
      })
    } else {
      setProfile({
        ...profile,
        [field]: value
      })
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">HL</span>
            </div>
            <span className="font-bold text-xl">HealthLink</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Navigation />
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
                <Button variant="outline" className="mt-4 w-full">Change Photo</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={profile.firstName}
                          onChange={(e) => handleInputChange(null, 'firstName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={profile.lastName}
                          onChange={(e) => handleInputChange(null, 'lastName', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profile.email}
                          onChange={(e) => handleInputChange(null, 'email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={profile.phone}
                          onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input 
                        id="dateOfBirth" 
                        type="date" 
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange(null, 'dateOfBirth', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={profile.address}
                        onChange={(e) => handleInputChange(null, 'address', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={profile.city}
                          onChange={(e) => handleInputChange(null, 'city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={profile.state}
                          onChange={(e) => handleInputChange(null, 'state', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input 
                          id="zipCode" 
                          value={profile.zipCode}
                          onChange={(e) => handleInputChange(null, 'zipCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Update your insurance details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Insurance Provider</Label>
                      <Input 
                        id="provider" 
                        value={profile.insurance.provider}
                        onChange={(e) => handleInputChange('insurance', 'provider', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input 
                          id="policyNumber" 
                          value={profile.insurance.policyNumber}
                          onChange={(e) => handleInputChange('insurance', 'policyNumber', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input 
                          id="groupNumber" 
                          value={profile.insurance.groupNumber}
                          onChange={(e) => handleInputChange('insurance', 'groupNumber', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input 
                        id="effectiveDate" 
                        type="date" 
                        value={profile.insurance.effectiveDate}
                        onChange={(e) => handleInputChange('insurance', 'effectiveDate', e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="emergency">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Update your emergency contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Name</Label>
                      <Input 
                        id="emergencyName" 
                        value={profile.emergencyContact.name}
                        onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input 
                          id="relationship" 
                          value={profile.emergencyContact.relationship}
                          onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Phone</Label>
                        <Input 
                          id="emergencyPhone" 
                          value={profile.emergencyContact.phone}
                          onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}