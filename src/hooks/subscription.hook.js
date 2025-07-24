import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionPlans = (billingCycle) => {
  return useQuery({
    queryKey: ["subscriptionPlans", billingCycle],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages", {
        params: { billing_cycle: billingCycle },
      });
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!billingCycle,
  });
};

//Dashboard Data

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/dashboard-data");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
