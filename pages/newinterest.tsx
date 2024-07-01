import { UserNav } from "@/src/components/ui/user-nav";
import { MainNav } from "../src/components/ui/main-nav";
import { InterestForm } from "@/src/components/ui/interest_form";

export default function newInterest() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10 flex justify-center">
          Add a new interest
        </h2>
        <div className="space-y-4 flex justify-center">

            <InterestForm />

        </div>
      </div>
    </div>
  );
}
