import { useEffect, useState } from "react";
import axios from "axios";
import { MainNav } from "../src/components/ui/main-nav";
import { OfferCard } from "@/src/components/ui/offer_card";
import { Offer_info } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { LoadingSpinner } from "@/src/components/ui/loading_spinner";
import { UserNav } from "@/src/components/ui/user-nav";

export default function Offers() {
  const [offers, setOffers] = useState<Offer_info[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

  useEffect(() => {
    async function fetchOffers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}offers/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const validOffers : Offer_info = response.data.data.filter((offer: Offer_info) => new Date(offer.expired) > new Date());
        setOffers(validOffers);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10 justify-center">
          Your offers
        </h2>
        <div>
          {loading && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center">
              <p className="text-red-500">Error loading offers</p>
            </div>
          )}
          {!loading && !error && (
            <div className="flex flex-wrap gap-4 justify-center pt-5">
              {offers.map((offer) => (
                <OfferCard key={offer.id} info={offer} className="w-[380px] h-auto" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
