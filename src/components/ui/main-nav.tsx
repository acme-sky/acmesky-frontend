import Link from "next/link"

import { cn } from "../../lib/utils"
import { Separator } from "./separator"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          href="/newinterest"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Add a new interest
        </Link>
        <Link
          href="/interests"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          My interests
        </Link>
        <Link
          href="/journeys"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Journeys
        </Link>
        <Link
          href="/offers"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Offers
        </Link>
      </nav>
      <div className="mt-2">
        <Separator className="w-full" />
      </div>
    </div>
  );
}