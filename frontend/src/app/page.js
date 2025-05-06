"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { CalendarIcon, MessageSquareIcon, UserIcon, ArrowRightIcon } from "lucide-react"

export default function Home() {
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
        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to HealthLink</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Your modern patient communication portal. Manage appointments, communicate with your healthcare provider, and access your medical information all in one place.
          </p>
        </section>
        
        <section className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CalendarIcon className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Schedule and manage your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View upcoming appointments, request new ones, and receive reminders.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/appointments" className="w-full">
                <Button className="w-full">
                  View Appointments
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <MessageSquareIcon className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with your healthcare provider</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Send secure messages to your doctor, receive lab results, and ask questions.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/messages" className="w-full">
                <Button className="w-full">
                  View Messages
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <UserIcon className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your contact details, insurance information, and preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/profile" className="w-full">
                <Button className="w-full">
                  View Profile
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}