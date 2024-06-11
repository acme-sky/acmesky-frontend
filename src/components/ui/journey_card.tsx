import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Journey_info } from "@/types";

type JourneyCardProps = {
  info: Journey_info;
} & React.ComponentProps<typeof Card>;

export function JourneyCard({
  info,
  className,
  ...props
}: JourneyCardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">
          {info.flight1.departure_airport} - {info.flight2.arrival_airport}
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
        <div className="border p-4 rounded-md space-y-2">
          <div>
            <p className="text-sm font-medium">Flight 2</p>
            <p className="text-xs">Departure Airport: {info.flight2.departure_airport}</p>
            <p className="text-xs">Arrival Airport: {info.flight2.arrival_airport}</p>
            <p className="text-xs">Airline: {info.flight2.airline}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Total Cost</p>
          <p className="text-sm">${info.cost}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
}
