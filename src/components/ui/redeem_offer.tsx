"use client";

import { useState } from "react";
import { Button } from "./button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "./input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Swal from "sweetalert2"


export function OfferRedeemForm() {
    const [token, setToken] = useState("")

    function onSubmit() {
        console.log(token)
        if(token.length < 6){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Check the token!",
              });
        }
    }

    return (
        <div className="flex items-center justify-center h-full p-6">
            <Card className="max-w-[800px] w-full p-8 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 border border-indigo-600 rounded-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">Reedem an Offer </CardTitle>
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
