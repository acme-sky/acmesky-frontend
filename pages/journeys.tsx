import { Button } from "../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs";
import { MainNav } from "../src/components/ui/main-nav";
import { FlightCard } from "@/src/components/ui/flight_card";


const flightInfo = {
    id: "1",
    arrival_airport: "JFK",
    arrival_time: "18:30",
    departure_airport: "LAX",
    departure_time: "15:00",
    cost: 300,
    airline: "Delta",
    token: "ABC123",
  };


export default function newInterest() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10 flex justify-center">
          Flights
        </h2>
        <div className="space-y-4 flex justify-center">
            <FlightCard info={flightInfo}/>
        </div>
      </div>
    </div>
  );
}
