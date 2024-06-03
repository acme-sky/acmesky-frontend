import Link from "next/link"

import { cn } from "../../lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
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
  )
}