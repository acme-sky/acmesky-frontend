"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { cn } from "../../lib/utils";
import { addDays, startOfDay, endOfDay, format } from "date-fns";
import axios from "axios";
import { AirportCombobox } from "./airports_combobox";
import Swal from "sweetalert2";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-range2";

const formSchema = z.object({
  flight1dep: z.string().min(3, "Outward Flight Departure is required"),
  flight1arr: z.string().min(3, "Outward Flight Arrival is required"),
  flight2dep: z.string().optional(),
  flight2arr: z.string().optional(),
  date_range: z.object({
    from: z.date(),
    to: z.date().optional()
  })
}).refine(data => {
  const flight2depFilled = !!data.flight2dep;
  const flight2arrFilled = !!data.flight2arr;
  return (flight2depFilled && flight2arrFilled) || (!flight2depFilled && !flight2arrFilled);
}, {
  message: "Both Return Flight Departure and Arrival must be provided or neither",
  path: ["flight2dep", "flight2arr"]
});

export function InterestForm() {
  const [token, setToken] = useState<string | null>(null);
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
        from: startOfDay(new Date(2024, 9, 20)),
        to: startOfDay(addDays(new Date(2024, 9, 20), 5)),
      }
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formatDate = (date: Date) => {
        return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      };
  
      let payload: any = {
        flight1_departure_airport: values.flight1dep,
        flight1_departure_time: formatDate(values.date_range.from),
        flight1_arrival_airport: values.flight1arr,
        flight1_arrival_time: formatDate(values.date_range.from),
      };
  
      if (values.flight2dep && values.flight2arr && values.date_range.to) {
        payload = {
          ...payload,
          flight2_departure_airport: values.flight2dep,
          flight2_departure_time: formatDate(values.date_range.to),
          flight2_arrival_airport: values.flight2arr,
          flight2_arrival_time: formatDate(values.date_range.to),
        };
      }
  
      console.log(payload);
  
      const response = await axios.post(`${apiUrl}interests/`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log('Form submitted successfully', response.data);
      Swal.fire({
        position: "center-right",
        icon: "success",
        title: "Saved!",
        text: "Your new interest has been saved! We'll get in touch.",
        timer: 2000,
        showConfirmButton: false
      });
  
      // Reset form fields after successful submission
      form.reset({
        flight1dep: "",
        flight1arr: "",
        flight2dep: "",
        flight2arr: "",
        date_range: {
          from: startOfDay(new Date(2024, 9, 20)),
          to: startOfDay(addDays(new Date(2024, 9, 20), 5)),
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Submit failed, please check the fields or connection.",
      });
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
        <Controller
          control={form.control}
          name="date_range"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pick Days</FormLabel>
              <DatePickerWithRange
                date={field.value}
                setDate={(newDate: DateRange | undefined) => {
                  if (newDate?.from) {
                    field.onChange({
                      from: newDate.from,
                      to: newDate.to || undefined
                    });
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}