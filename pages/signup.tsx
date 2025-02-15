"use client";
import React , {useState} from "react";
import { Label } from "../src/components/ui/label";
import { Input } from "../src/components/ui/input";
import { WavyBackground } from "../src/components/ui/wavy-background";
import { cn } from "../src/lib/utils";
import Link from "next/link";
import Swal from 'sweetalert2'


export function SignupFormDemo() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [prontogramusername, setProntogramusername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!username || !password || !name || !prontogramusername || !address || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await fetch(`${apiUrl}signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name, prontogramusername, address, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Registration successful", data);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "The user "+username+" has been successfully registered!",
        footer: '<a href="/login">Go to login page</a>'
      });

    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed, please check your credentials or existing accounts.",
      });
    } finally {
    }
  };

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to AcmeSky
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill in all the fields to register
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Name">Name and Surname</Label>
          <Input id="Name" placeholder="Mario Rossi" type="text" onChange={(e) => setName(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Username">Username</Label>
          <Input id="Username" placeholder="mario_rossi" type="text" onChange={(e) => setUsername(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="mario.rossi@email.com" type="email" onChange={(e) => setEmail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="ProntogramUsername">Prontogram Username</Label>
          <Input id="ProntogramUsername" placeholder="mariorossi10" type="text" onChange={(e) => setProntogramusername(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Address">Address</Label>
          <Input id="Address" placeholder="Mura Anteo Zamboni, 7, 40126 Bologna BO" type="text" onChange={(e) => setAddress(e.target.value)} />
        </LabelInputContainer>


        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? Sign in now
        </p>
        <Link href="/login">
        <button 
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login
            <BottomGradient />
          </button>
        <BottomGradient />
        </Link>

        {/*<div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
  </div>*/}
      </form>
    </div>
    </WavyBackground>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignupFormDemo;