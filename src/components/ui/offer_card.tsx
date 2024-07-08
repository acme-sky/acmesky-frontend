import { useState } from "react";
import { CheckCircledIcon, CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Offer_info } from "@/types";
import { FlightCard } from "./flight_card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./dialog";
import { format } from "date-fns";
import Link from "next/link";

type OfferCardProps = {
  info: Offer_info;
} & React.ComponentProps<typeof Card>;

export function OfferCard({
  info,
  className,
  ...props
}: OfferCardProps) {
  const handleConfirmOffer = () => {
    // Implement the logic to confirm the offer
    console.log("Offer confirmed");
  };

  const handlePaymentLink = () => {
    window.open(info.payment_link, "_blank");
  };

  const formatFlightInfo = (flight: any) => {
    return `${flight.departure_airport} to ${flight.arrival_airport} on ${format(new Date(flight.departure_time), "dd/MM/yyyy - HH:mm")}`;
  };

  const formatDateTime = (timestamp: number) => {
    let formattedDate = new Date(timestamp).toLocaleString("it-IT");
    console.log(formattedDate)
    return formattedDate;
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">Offer {info.id}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-m font-medium leading-none"> 
              {formatFlightInfo(info.journey.flight1)}
              {info.journey.flight2 && (
                <>
                  <br />
                  {formatFlightInfo(info.journey.flight2)}
                </>
              )}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium leading-none">Created At</p>
            <p className="text-sm">{new Date(info.created_at).toLocaleString("it-IT")}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Expires At</p>
            <p className="text-sm">{formatDateTime(Number(info.expired))}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <EyeOpenIcon className="mr-2 h-4 w-4" /> View journey
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] sm:w-[80%] lg:w-[50%]">
            <DialogHeader>
              <DialogTitle>Journey Details</DialogTitle>
              <DialogDescription className="pb-2">
                Here are the details of your journey.
              </DialogDescription>
            </DialogHeader>
            <div className="pb-5">
              <FlightCard info={info.journey.flight1} />
              {info.journey.flight2 && <FlightCard info={info.journey.flight2} />}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href={`/offers/${info.id}/page`} className="w-full mt-2">
        <Button className="w-full mt-2">
          <CheckCircledIcon className="mr-2 h-4 w-4" />Confirm Offer
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
