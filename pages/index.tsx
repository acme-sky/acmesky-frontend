"use client";
import { TypewriterEffectSmooth } from "../src/components/ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Acme",
      className: "text-5xl sm:text-3xl",
    },
    {
      text: "Sky",
      className: "text-blue-500 dark:text-blue-500 text-3xl sm:text-3xl",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default TypewriterEffectSmoothDemo;
