"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Offer_info } from "@/types";
import { JourneyCard } from "@/src/components/ui/journey_card";
import { Button } from "@/src/components/ui/button";
import { LoadingSpinner } from "@/src/components/ui/loading_spinner";
import { MainNav } from "@/src/components/ui/main-nav";
import { UserNav } from "@/src/components/ui/user-nav";
import { FlightCard } from "@/src/components/ui/flight_card";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

const formatDateTime = (timestamp: number) => {
  let formattedDate = new Date(timestamp).toLocaleString("it-IT");
  console.log(formattedDate);
  return formattedDate;
};

const OfferPage = () => {
  const router = useRouter();
  const { offerId } = router.query;
  const [offer, setOffer] = useState<Offer_info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (offerId) {
      const fetchOffer = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${apiUrl}offers/${offerId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOffer(response.data);
        } catch (error) {
          setError("Failed to fetch offer information");
        } finally {
          setLoading(false);
        }
      };
      fetchOffer();
    }
  }, [offerId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex-1 flex overflow-y-auto p-8 pt-6">
        <div className="w-3/4 pr-8 flex flex-col items-center">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Link href="/offers" className="mr-4">
                <Button variant="outline">Back to Offers</Button>
              </Link>
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full">
              <Link href="/offers" className="mr-4">
                <Button variant="outline">Back to Offers</Button>
              </Link>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {!loading && !error && offer && (
            <>
              <Link href="/offers" className="self-start mr-4">
                <Button variant="outline">Back to Offers</Button>
              </Link>
              <h1 className="text-3xl font-bold mb-2 text-center">Offer ID: {offer.id}</h1>
              <div className="w-full max-w-2xl p-4 my-2 rounded flex flex-col items-center">
                <p className="self-start"><strong>Journey ID:</strong> {offer.journey.id}</p>
                <FlightCard className="mb-5 mt-5 w-full" info={offer.journey.flight1} />
                {offer.journey.flight2 && (
                  <FlightCard className="w-full" info={offer.journey.flight2} />
                )}
                <p className="mb-5 mt-5 self-start"><strong>Total Cost:</strong> {offer.journey.cost}€</p>
                <p className="mb-5 mt-5 self-start"><strong>Expiration Date:</strong> {formatDateTime(Number(offer.expired))}</p>
                <p className="mb-5 mt-5 self-start"><strong>Redeemed Token:</strong> {offer.token}</p>
              </div>
            </>
          )}
        </div>
        <div className="w-1/4 flex items-center pl-4">
          {!loading && !error && offer && (
          <Button 
            className="p-8 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 border border-indigo-600 rounded-lg text-white font-bold hover:from-indigo-600 hover:to-purple-600 transition-colors duration-300"
            onClick={() => window.location.href = offer.payment_link}
          >
            Proceed to Payment
          </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;