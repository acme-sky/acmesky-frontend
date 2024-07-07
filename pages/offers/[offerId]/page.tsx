"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Offer_info } from "@/types";
import { OfferCard } from "@/src/components/ui/offer_card";
import { Button } from "@/src/components/ui/button";
import { LoadingSpinner } from "@/src/components/ui/loading_spinner";
import { MainNav } from "@/src/components/ui/main-nav";
import { UserNav } from "@/src/components/ui/user-nav";

const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;;

const OfferPage = () => {
  const router = useRouter();
  const { offerId } = router.query;
  const [offer, setOffer] = useState<Offer_info>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError(error);
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
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <div>
          {loading && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {!loading && !error && (
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                <OfferCard info={offer} className="w-[380px] h-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
