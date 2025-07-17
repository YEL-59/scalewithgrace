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

const Billing = () => {
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M19.7499 10.5V9.99995C19.7499 6.22876 19.7498 4.34311 18.5783 3.17154C17.4067 2 15.5211 2 11.7499 2C7.97883 2 6.0932 2.00006 4.92163 3.17159C3.75009 4.34315 3.75007 6.22872 3.75004 9.99988L3.75 14.5C3.74997 17.7874 3.74996 19.4312 4.65788 20.5375C4.82412 20.7401 5.00986 20.9258 5.21243 21.0921C6.31877 22 7.96249 22 11.2499 22"
                        stroke="#191919"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.75 7H15.75M7.75 11H11.75"
                        stroke="#191919"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.75 18.5L17.25 17.95V15.5M12.75 17.5C12.75 19.9853 14.7647 22 17.25 22C19.7353 22 21.75 19.9853 21.75 17.5C21.75 15.0147 19.7353 13 17.25 13C14.7647 13 12.75 15.0147 12.75 17.5Z"
                        stroke="#191919"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  Payment History
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="px-5 py-2 rounded-full data-[state=active]:bg-white data-[state=active]:text-black text-white"
                >
                  <span className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M2.25 12C2.25 8.46252 2.25 6.69377 3.3028 5.5129C3.47119 5.32403 3.65678 5.14935 3.85746 4.99087C5.11213 4 6.99142 4 10.75 4H13.75C17.5086 4 19.3879 4 20.6425 4.99087C20.8432 5.14935 21.0288 5.32403 21.1972 5.5129C22.25 6.69377 22.25 8.46252 22.25 12C22.25 15.5375 22.25 17.3062 21.1972 18.4871C21.0288 18.676 20.8432 18.8506 20.6425 19.0091C19.3879 20 17.5086 20 13.75 20H10.75C6.99142 20 5.11213 20 3.85746 19.0091C3.65678 18.8506 3.47119 18.676 3.3028 18.4871C2.25 17.3062 2.25 15.5375 2.25 12Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.25 16H11.75"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.75 16H18.25"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.25 9H22.25"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
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
