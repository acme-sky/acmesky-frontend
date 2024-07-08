import { Metadata } from "next"
import Image from "next/image"

import { Button } from "../src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs"
import { CalendarDateRangePicker } from "../src/components/ui/date-range-picker"
import { MainNav } from "../src/components/ui/main-nav"
import { Overview } from "../src/components/ui/overview"
import { RecentSales } from "../src/components/ui/recent-sales"
import { Search } from "../src/components/ui/search"
import { UserNav } from "../src/components/ui/user-nav"
import { SavedInterest } from "@/src/components/ui/saved_interests"
import { HoverEffect } from "@/src/components/ui/card-hover"
import UserCard from "@/src/components/ui/user_card"

export const features = [
  {
    title: "Interests",
    description:
      "View your saved interests. We try to create a journey for you based on those.",
    link: "/interests",
  },
  {
    title: "Add a new interest",
    description:
      "Add an interest for your dream trip, then let us do our thing.",
    link: "/newinterest",
  },
  {
    title: "Journeys",
    description:
      "View the journeys we created for you.",
    link: "/journeys",
  },
  {
    title: "Offers",
    description:
      "We did our work, now reedem an offer or pay.",
    link: "/offers",
  },
  {
    title: "Receipts",
    description:
      "Check on details for your upcoming trips.",
    link: "/receipts",
  },
];

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function Dashboard() {
  return (
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <Tabs defaultValue="features" className="space-y-4">
            <TabsList>
              <TabsTrigger value="features">Our services</TabsTrigger>
              <TabsTrigger value="user" >
                Your info
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="space-y-4">
                <div className="max-w-5xl mx-auto px-8 flex-justify-center">
                <HoverEffect items={features} />
                </div>
            </TabsContent>
            <TabsContent value="user" className="space-y-4">
                <div className="max-w-5xl mx-auto px-8 flex-justify-center">
                <UserCard />
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}