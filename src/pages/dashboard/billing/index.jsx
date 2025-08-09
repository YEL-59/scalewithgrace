import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PricingPlan from "@/components/common/home/pricing-plan-section";
import Paymenthistory from "@/assets/svg/paymenthistory";
import Pricing from "@/assets/svg/pricing";
import { usePageMeta } from "@/hooks/usePageMeta.hook";
import { useGetMySubscription } from "@/hooks/subscription.hook";
import { format } from "date-fns";

const Billing = () => {
  usePageMeta({
    title: "Billing – Karially",
    description: "Manage your billing and subscription details on Karially.",
  });
  return (
    <div className=" w-full min-h-screen">
      <section className="relative z-10 py-20 px-4 text-white">
        <div className="container mx-auto text-center  mb-14">
          <Tabs defaultValue="table">
            {/* TabsList */}
            <div className="flex justify-start">
              <TabsList className="bg-gradient-to-r from-primary to-secondary p-1 rounded-full inline-flex mb-6">
                <TabsTrigger
                  value="table"
                  className="px-5 py-2 rounded-full  data-[state=active]:bg-white data-[state=active]:text-black text-white"
                >
                  <span className="flex gap-2">
                    <Paymenthistory />
                  </span>
                  Payment History
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="px-5 py-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-black text-white"
                >
                  <span className="flex gap-2">
                    <Pricing />
                  </span>
                  Pricing
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Monthly Plans */}
            <TabsContent value="table" className="mt-12">
              <BillingHistoryTable />
            </TabsContent>

            {/* Yearly Plans */}
            <TabsContent value="yearly" className="mt-12">
              <PricingPlan />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export function BillingHistoryTable() {
  const { data, isLoading, isError } = useGetMySubscription();

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.length)
    return <div>No subscription history found.</div>;

  return (
    <Table>
      <TableHeader className="bg-gradient-to-r from-primary to-secondary h-20 px-5">
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-white rounded-l-md text-center">
            Ref ID
          </TableHead>
          <TableHead className="text-white text-center">
            Transaction Date
          </TableHead>
          <TableHead className="text-white text-center">From</TableHead>
          <TableHead className="text-white text-center">Plan</TableHead>
          <TableHead className="text-white text-center">Amount</TableHead>
          <TableHead className="text-white rounded-r-md">Status</TableHead>
          {/* <TableHead className="text-white rounded-r-md">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium text-black py-5">
              {subscription.stripe_subscription_id || "N/A"}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              {format(new Date(subscription.started_at), "PPpp")}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              Stripe
            </TableCell>
            <TableCell className="font-medium text-black py-5 capitalize">
              {subscription.package?.billing_cycle || "N/A"}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              ${subscription.package?.price || "0.00"}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-xs ${getStatusClass(
                  subscription.status
                )}`}
              >
                {subscription.status}
              </span>
            </TableCell>
            {/* <TableCell>
              <button className="text-blue-600 hover:text-blue-800">
                View
              </button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Billing;
