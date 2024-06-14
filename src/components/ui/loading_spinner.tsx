"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent } from "./card";

const spinnerVariants =
  "w-16 h-16 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Card className="flex items-center justify-center w-full h-full p-6 border border-gray-300 shadow-lg">
      <CardContent className="flex items-center justify-center w-full h-full">
        <div ref={ref} className={cn(spinnerVariants, className)} {...rest} />
      </CardContent>
    </Card>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
