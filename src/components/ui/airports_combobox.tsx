"use client";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { CaretSortIcon } from "@radix-ui/react-icons";

const airportData = [
  {
    "label": "Aeroporto Catania Fontanarossa",
    "value": "CTA"
  },
  {
    "label": "Kobenhavn International Airport",
    "value": "CPH"
  },
  {
    "label": "Bologna Guglielmo Marconi Airport",
    "value": "BLQ"
  },
  {
    "label": "Naples International Airport",
    "value": "NAP"
  },
  {
    "label": "Amsterdam Airport Schiphol",
    "value": "AMS"
  },
  {
    "label": "London Heathfield",
    "value": "LHR"
  },
  {
    "label": "Charles de Gaulle Airport",
    "value": "CDG"
  },
  {
    "label": "Berlin Brandenburg Airport",
    "value": "BER"
  },
  {
    "label": "Aeroporto di Roma Fiumicino",
    "value": "FCO"
  },
  {
    "label": "London Stansted Airport",
    "value": "LTN"
  },
  {
    "label": "Warsaw Chopin Airport",
    "value": "WAW"
  },
  {
    "label": "Brussels Airport",
    "value": "BRU"
  },
  {
    "label": "Munich Airport",
    "value": "MUC"
  },
  {
    "label": "Vienna International Airport",
    "value": "VIE"
  },
  {
    "label": "Dusseldorf International Airport",
    "value": "DUS"
  },
  {
    "label": "Hamburg Airport",
    "value": "HAM"
  },
  {
    "label": "Adolfo Suarez Madrid",
    "value": "MAD"
  },
  {
    "label": "Barcelona International Airport",
    "value": "BCN"
  },
  {
    "label": "Prague Airport",
    "value": "PRG"
  },
  {
    "label": "Kraków John Paul II International Airport",
    "value": "KRK"
  },
  {
    "label": "San Francisco International Airport",
    "value": "SFO"
  },
  {
    "label": "John F Kennedy International Airport",
    "value": "JFK"
  },
  {
    "label": "Keflavik International Airport",
    "value": "KEF"
  },
  {
    "label": "Malpensa International Airport",
    "value": "MXP"
  },
  {
    "label": "Pisa International Airport",
    "value": "PSA"
  },
  {
    "label": "Gothenburg-Landvetter Airport",
    "value": "GOT"
  },
  {
    "label": "Stockholm-Arlanda Airport",
    "value": "ARN"
  },
  {
    "label": "Budapest Liszt Ferenc International Airport",
    "value": "BUD"
  },
  {
    "label": "Zürich Airport",
    "value": "ZRH"
  }
];

export function AirportCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? airportData.find((airport) => airport.value === value)?.label
            : "Select airport..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search airport..." className="h-9 w-full" />
          <CommandList className="w-full">
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup className="w-full">
              {airportData.map((airport) => (
                <CommandItem
                  key={airport.value}
                  value={airport.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  {airport.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === airport.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
