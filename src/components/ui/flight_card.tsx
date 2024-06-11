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
import { Flight_info } from "@/types";

type FlightCardProps = {
  info: Flight_info;
} & React.ComponentProps<typeof Card>;

export function FlightCard({
  info,
  className,
  ...props
}: FlightCardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">{info.departure_airport} - {info.arrival_airport} </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Airline: {info.airline}
            </p>
            <p className="text-sm text-muted-foreground">Token: {info.token}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium leading-none">Departure</p>
            <p className="text-sm">Airport: {info.departure_airport}</p>
            <p className="text-sm">Time: {info.departure_time}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Arrival</p>
            <p className="text-sm">Airport: {info.arrival_airport}</p>
            <p className="text-sm">Time: {info.arrival_time}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium leading-none">Cost</p>
            <p className="text-sm">${info.cost}</p>
          </div>
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
