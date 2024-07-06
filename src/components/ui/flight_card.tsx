import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Flight_info } from "@/types";
import { format } from "date-fns";

type FlightCardProps = {
  info: Flight_info;
} & React.ComponentProps<typeof Card>;

export function FlightCard({ info, className, ...props }: FlightCardProps) {
  return (
    <Card className={cn("w-[480px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">
          {info.departure_airport} - {info.arrival_airport}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <p className="text-sm font-bold">Airline</p>
          <p className="text-sm">{info.airline}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-bold">Departure</p>
            <div className="space-y-1">
              <p className="text-sm">Airport: {info.departure_airport}</p>
              <p className="text-sm">
                Day and time of departure: {format(new Date(info.departure_time), "dd/MM/yyyy - HH:mm")}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Arrival</p>
            <div className="space-y-1">
              <p className="text-sm">Airport: {info.arrival_airport}</p>
              <p className="text-sm">
                Day and time of arrival: {format(new Date(info.arrival_time), "dd/MM/yyyy - HH:mm")}
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-bold">Cost</p>
            <p className="text-sm">${info.cost}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
