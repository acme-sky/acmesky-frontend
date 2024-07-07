"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "./input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Swal from "sweetalert2";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

export function OfferRedeemForm() {
    const [token, setToken] = useState("");
    const [auth_token, setAuthToken] = useState<String | null>("");
    
    useEffect(() => {
        const auth_token= localStorage.getItem("token");
        setAuthToken(auth_token);
      }, []);


      async function onSubmit() {
        if (token.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Check the token!",
            });
            return;
        }

        Swal.fire({
            title: "Processing...",
            text: "Please wait while we validate your token.",
            icon: "info",
            timer: 2000,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await axios.post(`${apiUrl}offers/confirm/`, { token }, {
                headers: { Authorization: `Bearer ${auth_token}` }
            });
            Swal.close();

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your offer has been redeemed successfully.",
                });
                setToken("")
            }
        } catch (error: any) {
            Swal.close();
            if (error.response && error.response.data && error.response.data.message === '`token` does not exist.') {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Token",
                    text: "The token you provided does not exist :( Try again.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There was an error connecting to the server. Please try again.",
                });
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-full p-6">
            <Card className="max-w-[800px] w-full p-8 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 border border-indigo-600 rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-white">Redeem an Offer</CardTitle>
                    <CardDescription className="text-lg text-white mt-2">Insert here the token we sent you on Prontogram.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <InputOTP className="flex justify-self-stretch" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={token} onChange={(token) => setToken(token)}>
                        <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={onSubmit} className="w-3/4">Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
