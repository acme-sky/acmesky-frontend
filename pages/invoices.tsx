import { useEffect, useState } from "react";
import axios from "axios";
import { MainNav } from "../src/components/ui/main-nav";
import { InvoiceCard } from "@/src/components/ui/invoice_card";
import { Invoice_info } from "@/types";
import { LoadingSpinner } from "@/src/components/ui/loading_spinner";
import { UserNav } from "@/src/components/ui/user-nav";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice_info[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}invoices/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvoices(response.data.data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, [apiUrl]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight flex h-16 items-center px-10 justify-center">
          Your invoices
        </h2>
        <div>
          {loading && (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {!loading && !error && invoices.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-lg">No invoices available for you :(</p>
            </div>
          )}
          {!loading && !error && invoices.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center pt-5">
              {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} info={invoice} className="w-[380px] h-auto" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
