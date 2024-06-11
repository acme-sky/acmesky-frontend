import { useEffect, useState } from "react";
import axios from "axios";
import { MainNav } from "../src/components/ui/main-nav";
import { JourneyCard } from "@/src/components/ui/journey_card";
import { Journey_info } from "@/types";

export default function Journeys() {
  const [journeys, setJourneys] = useState<Journey_info[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJourneys() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/v1/journeys/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJourneys(response.data.data);
        //console.log(journeys);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJourneys();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading journeys</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10 justify-center">
          Your Journeys
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {journeys.map((journey) => (
            <JourneyCard key={journey.id} info={journey} className="w-[380px] h-[300px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
