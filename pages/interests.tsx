import { Button } from "../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs";
import { MainNav } from "../src/components/ui/main-nav";
import { SavedInterest } from "@/src/components/ui/saved_interests";

export default function Interests() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10">
          Your interests
        </h2>
        <div className="space-y-4">
          <Card className="flex-1">
            <SavedInterest />
          </Card>
        </div>
      </div>
    </div>
  );
}
