import useSWR from 'swr';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { useEffect, useState } from 'react';
import { User, Interest} from "../../../types"
import axios from 'axios'
import { LoadingSpinner } from './loading_spinner';
import { InterestTable } from './interest_table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<Interest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ cell }) => {
      const dateStr = cell.getValue<string>();
      if (!dateStr) return null; // Return null to render nothing if dateStr is null

      const date = new Date(dateStr);
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {format(date, 'dd/MM/yyyy - HH:mm')}
        </div>
      );
    }
  },
  {
    accessorKey: "flight1_departure_time",
    header: "Outward Flight Departure Time",
    cell: ({ cell }) => {
      const dateStr = cell.getValue<string>();
      if (!dateStr) return null; // Return null to render nothing if dateStr is null

      const date = new Date(dateStr);
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {format(date, 'dd/MM/yyyy - HH:mm')}
        </div>
      );
    }
  },
  {
    accessorKey: "flight1_departure_airport",
    header: "Outward Flight Departure Airport",
  },
  {
    accessorKey: "flight1_arrival_time",
    header: "Outward Flight Arrival Time",
    cell: ({ cell }) => {
      const dateStr = cell.getValue<string>();
      if (!dateStr) return null; // Return null to render nothing if dateStr is null

      const date = new Date(dateStr);
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {format(date, 'dd/MM/yyyy - HH:mm')}
        </div>
      );
    }
  },
  {
    accessorKey: "flight1_arrival_airport",
    header: "Outward Flight Arrival Airport",
  },
  {
    accessorKey: "flight2_departure_time",
    header: "Return Flight Departure Time",
    cell: ({ cell }) => {
      const dateStr = cell.getValue<string>();
      if (!dateStr) return null; // Return null to render nothing if dateStr is null

      const date = new Date(dateStr);
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {format(date, 'dd/MM/yyyy - HH:mm')}
        </div>
      );
    }
  },
  {
    accessorKey: "flight2_departure_airport",
    header: "Return Flight Departure Airport",
  },
  {
    accessorKey: "flight2_arrival_time",
    header: "Return Flight Arrival Time",
    cell: ({ cell }) => {
      const dateStr = cell.getValue<string>();
      if (!dateStr) return null; // Return null to render nothing if dateStr is null

      const date = new Date(dateStr);
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {format(date, 'dd/MM/yyyy - HH:mm')}
        </div>
      );
    }
  },
  {
    accessorKey: "flight2_arrival_airport",
    header: "Return Flight Arrival Airport",
  },
];

const fetcher = (url: string, token:string | null | unknown) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data); 

export function SavedInterest() {
    //const [user_id, setUser_id] = useState<string | null>(null);
    const [token, setToken] = useState<string| null>("");
    const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;


    useEffect(() => {
        /*const storedUserId: string | null = localStorage.getItem("user_id");
        setUser_id(storedUserId);*/

        const storedToken: string | null = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const { data, error } = useSWR([`${apiUrl}interests/`, token], ([url, token]) => fetcher(url, token))
    
    if (!data) {
        return <LoadingSpinner />;
    }
    
    const interests: Interest[] = data.data

    if (error) {
        return <LoadingSpinner />;
    }



    return (

    <div className="container mx-auto py-1">
        <InterestTable columns={columns} data={interests}  />
    </div>)
}
