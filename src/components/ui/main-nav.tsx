import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/newinterest", label: "Add a new interest" },
    { href: "/interests", label: "My interests" },
    { href: "/journeys", label: "Journeys" },
    { href: "/offers", label: "Offers" },
    { href: "/invoices", label: "Invoices" },
  ];

  return (
    <div className={cn("w-full", className)} {...props}>
      <nav className="flex items-center space-x-6 lg:space-x-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-base font-medium transition-colors border-b-2",
              (router.pathname === link.href || 
               (link.href === "/offers" && router.pathname.startsWith("/offers")))
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-primary hover:border-primary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-2">
        <Separator className="w-full" />
      </div>
    </div>
  );
}