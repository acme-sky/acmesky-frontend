"use client"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "./button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"
import { Calendar, DateRange } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { cn } from "../../lib/utils"
import { addDays, format } from "date-fns"
import axios from "axios"
import { AirportCombobox } from "./airports_combobox"

// Update the schema to handle date_range as an object with from and to dates
const formSchema = z.object({
  flight1dep: z.string().min(3),
  flight1arr: z.string().min(3),
  flight2dep: z.string().min(3),
  flight2arr: z.string().min(3),
  date_range: z.object({
    from: z.date(),
    to: z.date()
  })
})

export function InterestForm() {
  // Define your form.
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  })

  const [token, setToken] = useState<string| null>("");
  const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;


  useEffect(() => {
    const storedToken: string | null = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flight1dep: "",
      flight1arr: "",
      flight2dep: "",
      flight2arr: "",
      date_range: {
        from: new Date(2024, 0, 20),
        to: addDays(new Date(2024, 0, 20), 20),
      }
    }
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        flight1_departure_airport: values.flight1dep,
        flight1_departure_time: values.date_range.from.toISOString(),
        flight1_arrival_airport: values.flight1arr,
        flight1_arrival_time: values.date_range.from.toISOString(),
        flight2_departure_airport: values.flight2dep,
        flight2_departure_time: values.date_range.to.toISOString(),
        flight2_arrival_airport: values.flight2arr,
        flight2_arrival_time: values.date_range.to.toISOString(),
      };

      console.log(payload)

      const response = await axios.post(`${apiUrl}interests/`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="flight1dep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outward Flight Departure</FormLabel>
              <FormControl>
                <AirportCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight1arr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outward Flight Arrival</FormLabel>
              <FormControl>
                <AirportCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight2dep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Flight Departure</FormLabel>
              <FormControl>
                <AirportCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight2arr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Flight Arrival</FormLabel>
              <FormControl>
                <AirportCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_range"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pick Days</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(range) => {
                      setDate(range)
                      field.onChange(range)
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
