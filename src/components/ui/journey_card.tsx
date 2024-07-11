"use client";

import { useState } from "react";
import { CheckIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./card";
import { Journey_info } from "@/types";
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

type JourneyCardProps = {
  info: Journey_info;
} & React.ComponentProps<typeof Card>;

export function JourneyCard({
  info,
  className,
  ...props
}: JourneyCardProps) {
  return (
    <div className="relative flex">
      <Card className={cn("w-[400px]", className)} {...props}>
        <CardHeader>
        <CardTitle className="flex items-center">
          {info.flight1.departure_airport} - {info.flight2 ? info.flight2.arrival_airport : info.flight1.arrival_airport}
        </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="border p-4 rounded-md space-y-2">
            <div>
              <p className="text-sm font-medium">Flight 1</p>
              <p className="text-xs">Departure Airport: {info.flight1.departure_airport}</p>
              <p className="text-xs">Arrival Airport: {info.flight1.arrival_airport}</p>
              <p className="text-xs">Airline: {info.flight1.airline}</p>
            </div>
          </div>
          {info.flight2 && (
            <div className="border p-4 rounded-md space-y-2">
              <div>
                <p className="text-sm font-medium">Flight 2</p>
                <p className="text-xs">Departure Airport: {info.flight2.departure_airport}</p>
                <p className="text-xs">Arrival Airport: {info.flight2.arrival_airport}</p>
                <p className="text-xs">Airline: {info.flight2.airline}</p>
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-medium leading-none">Total Cost</p>
            <p className="text-sm">{info.cost}€</p>
          </div>
        </CardContent>
        <CardFooter className="grid gap-4">
          <Button>
            <CheckIcon className="mr-2 h-4 w-4" /> Go to offer
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <EyeOpenIcon className="mr-2 h-4 w-4"   /> View details
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90%] sm:w-[80%] lg:w-[25%]" side="right">
              <SheetHeader>
                <SheetTitle>Journey Details</SheetTitle>
                <SheetDescription className="pb-2">
                  Here are the details of your journey.
                </SheetDescription>
              </SheetHeader>
              <div className="pb-5">
                <FlightCard info={info.flight1} />
                {info.flight2 && <FlightCard info={info.flight2} />}
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
