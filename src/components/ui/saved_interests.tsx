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
        return <div>Loading...</div>;
    }
    
    const interests: Interest[] = data.data

    if (error) {
        return <div>Error loading interests: {error.message}</div>;
    }



    return (
        <Table>
            <TableCaption>A list of your saved Interests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Outward Flight Departure Time</TableHead>
                    <TableHead>Outward Flight Departure Airport</TableHead>
                    <TableHead>Outward Flight Arrival Time</TableHead>
                    <TableHead>Outward Flight Arrival Airport</TableHead>
                    <TableHead>Return Flight Departure Time</TableHead>
                    <TableHead>Return Flight Departure Airport</TableHead>
                    <TableHead>Return Flight Arrival Time</TableHead>
                    <TableHead>Return Flight Arrival Airport</TableHead>
                    {/*<TableHead>User</TableHead>*/}
                </TableRow>
            </TableHeader>
            <TableBody>
                {interests.map((interest) => (
                    <TableRow key={interest.id}>
                        <TableCell className="font-medium">{interest.id}</TableCell>
                        <TableCell>{interest.created_at}</TableCell>
                        <TableCell>{interest.flight1_departure_time || "0001-01-01T00:00:00Z"}</TableCell>
                        <TableCell>{interest.flight1_departure_airport || ""}</TableCell>
                        <TableCell>{interest.flight1_arrival_time || "0001-01-01T00:00:00Z"}</TableCell>
                        <TableCell>{interest.flight1_arrival_airport || ""}</TableCell>
                        <TableCell>{interest.flight2_departure_time || "null"}</TableCell>
                        <TableCell>{interest.flight2_departure_airport || "null"}</TableCell>
                        <TableCell>{interest.flight2_arrival_time || "null"}</TableCell>
                        <TableCell>{interest.flight2_arrival_airport || "null"}</TableCell>
                        {/*<TableCell>{interest.user.username}</TableCell>*/}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
