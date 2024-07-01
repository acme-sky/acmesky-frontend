import { PersonIcon } from "@radix-ui/react-icons";
import {
  Avatar
} from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from 'next/link';

function logout() {
  localStorage.removeItem("token");
}

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <PersonIcon className="w-full h-full object-cover" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent  align="end" forceMount>
        <DropdownMenuItem>
          <Link href="/login">
          <Button className="w-full" onClick={logout}>
            Logout
          </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
