// app/demo/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { MainNav } from "@/src/components/ui/main-nav";
import { UserNav } from "@/src/components/ui/user-nav";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function DemoPage() {
  const [token, setToken] = useState("");
  const [flightId, setFlightId] = useState<number | "">(""); // Allow empty string for initial state
  const apiUrl = process.env.NEXT_PUBLIC_AIRLINE_API_HOST;

  const handleApiCall = async () => {
    try {
      const response = await axios.post(`${apiUrl}hooks/offer/`,
        { flight_id: flightId },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
            accept: "application/json, */*;q=0.5",
          },
        }
      );                
      console.log(response.data);
    } catch (error) {
      console.error("Error making API call", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow space-y-4">
        <h1>Demo for last minute</h1>
        <Input
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-96"
        />
        <Input
          type="number"
          placeholder="Enter flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value ? parseInt(e.target.value) : "")}
          className="w-96"
        />
        <Button onClick={handleApiCall}>Make API Call</Button>
      </div>
    </div>
  );
}
