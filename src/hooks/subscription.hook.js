import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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

export const useCheckoutSubscription = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id) => {
      console.log("Checking out plan:", id);
      const response = await axiosPrivate.post(`/create-subscription/${id}`, {
        success_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-canceled`,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.payment_url) {
        // ✅ Redirect to Stripe Checkout
        window.location.href = data.payment_url;
      } else {
        toast.success(data?.message || "Free plan activated.");
        navigate("/");
      }
    },
    onError: (err) => {
      const message = err.response?.data?.message;
      toast.error(message || "Something went wrong.");
    },
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
