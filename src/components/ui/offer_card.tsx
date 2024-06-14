import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Offer_info } from "@/types";
import { Input } from "./input"

type OfferCardProps = {
  info: Offer_info;
} & React.ComponentProps<typeof Card>;

export function OfferCard({
  info,
  className,
  ...props
}: OfferCardProps) {
  const [token, setToken] = useState(info.token);

  const handleConfirmOffer = () => {
    // Implement the logic to confirm the offer
    console.log("Offer confirmed");
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">Offer {info.id}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-m font-medium leading-none">
              Token: 
              <Input placeholder="Insert your token here" />
            </p>
            <p className="text-m text-muted-foreground">
              Payment link: <a href={info.payment_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a>
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={info.is_used}
                readOnly
                className="mr-2"
              />
              <span className="text-sm">{info.is_used ? "Used" : "Not Used"}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium leading-none">Created At</p>
            <p className="text-sm">{new Date(info.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Expires At</p>
            <p className="text-sm">{new Date(info.expired).toLocaleString()}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium leading-none">Message</p>
            <p className="text-sm">{info.message}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mt-2" onClick={() => window.location.href = `/journeys/${info.journey_id}`}>
          View Journey Details
        </Button>
        <Button className="w-full mt-2" onClick={handleConfirmOffer}>
          Confirm Offer
        </Button>
      </CardFooter>
    </Card>
  );
}
