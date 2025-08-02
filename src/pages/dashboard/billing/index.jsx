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
  const transactions = [
    {
      refId: "456789356",
      date: "Sep 9, 2024, 04:30pm",
      from: "Mastercard - 3345xxx",
      plan: "1 month",
      amount: "$19.00",
      status: "Pending",
    },
    {
      refId: "456789356",
      date: "Sep 8, 2024, 03:13pm",
      from: "Visa - 5466xxxx",
      plan: "1 month",
      amount: "$19.00",
      status: "Completed",
    },
    {
      refId: "456789356",
      date: "Sep 7, 2024, 01:00pm",
      from: "Mastercard - 3345xxx",
      plan: "1 month",
      amount: "$19.00",
      status: "Cancelled",
    },
    {
      refId: "456789356",
      date: "Sep 6, 2024, 07:00am",
      from: "Mastercard - 3345xxx",
      plan: "1 month",
      amount: "$19.00",
      status: "Pending",
    },
    {
      refId: "456789356",
      date: "Sep 8, 2024, 03:13pm",
      from: "Visa - 5466xxxx",
      plan: "1 Year",
      amount: "$39.99",
      status: "Completed",
    },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Table>
      {/* <TableCaption>A list of your recent transactions.</TableCaption> */}
      <TableHeader className="bg-gradient-to-r from-primary to-secondary  h-20 px-5">
        <TableRow className="hover:bg-transparent ">
          <TableHead className="text-white rounded-l-md">Ref ID</TableHead>
          <TableHead className="text-white">Transaction Date</TableHead>
          <TableHead className="text-white">From</TableHead>
          <TableHead className="text-white">Plan</TableHead>
          <TableHead className="text-white">Amount</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white rounded-r-md">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-black py-5">
              {transaction.refId}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              {transaction.date}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              {transaction.from}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              {transaction.plan}
            </TableCell>
            <TableCell className="font-medium text-black py-5">
              {transaction.amount}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-md text-xs ${getStatusClass(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </span>
            </TableCell>
            <TableCell>
              <button className="text-blue-600 hover:text-blue-800">
                View
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Billing;
