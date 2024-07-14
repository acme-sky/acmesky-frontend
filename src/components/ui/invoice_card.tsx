"use client";

import { useState } from "react";
import { CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./card";
import { Invoice_info } from "@/types";
import { FlightCard } from "./flight_card";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";
import Link from "next/link";

type InvoiceCardProps = {
  info: Invoice_info;
} & React.ComponentProps<typeof Card>;

export function InvoiceCard({
  info,
  className,
  ...props
}: InvoiceCardProps) {
  return (
    <div className="relative flex">
      <Card className={cn("w-[400px]", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center">
            Invoice for {info.user.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {info.journey.cost >= 1000 ? (
            <div className="border p-4 rounded-md space-y-2">
              <div>
                <p className="text-sm font-medium">Rent Details</p>
                <p className="text-xs">Rent Customer Name: {info.rent_customer_name}</p>
                <p className="text-xs">Rent Pickup Address: {info.rent_pickup_address}</p>
                <p className="text-xs">Rent Pickup Date: {new Date(info.rent_pickup_date).toLocaleString()}</p>
                <p className="text-xs">Rent Address: {info.rent_address}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-md space-y-2">
              <p className="text-sm font-medium">No premium rent service for purchases under 1000€</p>
            </div>
          )}
          {/*<div className="border p-4 rounded-md space-y-2">
            <div>
              <p className="text-sm font-medium">Flight 1 Details</p>
              <p className="text-xs">Departure Airport: {info.journey.flight1.departure_airport}</p>
              <p className="text-xs">Arrival Airport: {info.journey.flight1.arrival_airport}</p>
              <p className="text-xs">Airline: {info.journey.flight1.airline}</p>
              <p className="text-xs">Departure Time: {new Date(info.journey.flight1.departure_time).toLocaleString()}</p>
              <p className="text-xs">Arrival Time: {new Date(info.journey.flight1.arrival_time).toLocaleString()}</p>
              <p className="text-xs">Flight Cost: ${info.journey.flight1.cost}</p>
            </div>
          </div>
          {info.journey.flight2 && (
            <div className="border p-4 rounded-md space-y-2">
              <div>
                <p className="text-sm font-medium">Flight 2 Details</p>
                <p className="text-xs">Departure Airport: {info.journey.flight2.departure_airport}</p>
                <p className="text-xs">Arrival Airport: {info.journey.flight2.arrival_airport}</p>
                <p className="text-xs">Airline: {info.journey.flight2.airline}</p>
                <p className="text-xs">Departure Time: {new Date(info.journey.flight2.departure_time).toLocaleString()}</p>
                <p className="text-xs">Arrival Time: {new Date(info.journey.flight2.arrival_time).toLocaleString()}</p>
                <p className="text-xs">Flight Cost: ${info.journey.flight2.cost}</p>
              </div>
            </div>
          )}*/}
          <div>
            <p className="text-sm font-medium leading-none">Total Invoice Cost</p>
            <p className="text-sm">{info.journey.cost}€</p>
          </div>
        </CardContent>
        <CardFooter className="grid gap-4">
        {/*<Link href={`/offers/${info.id}/page`} passHref>
          <Button>
            <CheckIcon className="mr-2 h-4 w-4" /> Go to offer
          </Button>
        </Link>*/}
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <EyeOpenIcon className="mr-2 h-4 w-4" /> View Journey
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90%] sm:w-[80%] lg:w-[25%]" side="right">
              <SheetHeader>
                <SheetTitle>Invoice Details</SheetTitle>
                <SheetDescription className="pb-2">
                  Here are the details of your Journey.
                </SheetDescription>
              </SheetHeader>
              <div className="pb-5">
                <FlightCard info={info.journey.flight1} />
                {info.journey.flight2 && <FlightCard info={info.journey.flight2} />}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardFooter>
      </Card>
    </div>
  );
}
  