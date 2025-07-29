import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import {
  forgetPassword,
  OtpMatchSchema,
  signInSchema,
  signUpSchema,
} from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
//import { useSearchParams } from "react-router";

//sign in
export const useSignIn = () => {
  //const [params] = useSearchParams();
  const navigate = useNavigate();
  //const redirectUrl = params.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosPublic.post("/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Sign in successfully");
        const token = data?.token;
        localStorage.setItem("token", token);
        const user = data?.data;
        localStorage.setItem("user", JSON.stringify(user));

        if (data?.status) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data?.message || "Failed to sign in");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error || // fallback to `data.error`
        error.message ||
        "Failed to sign in";

      // Handle email-specific error
      if (
        typeof message === "string" &&
        message.toLowerCase().includes("email")
      ) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

//sign-up
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      //   terms_and_conditions: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "terms_and_conditions") {
          formData.append(key, value ? "1" : "0");
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await axiosPublic.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "User created successfully");
        const token = data?.data?.token;
        localStorage.setItem("token", token);
        const user = data?.data;
        localStorage.setItem("usersignup", JSON.stringify(user));
        navigate("/otp-verify", {
          state: { email: form.watch("email") },
        });
      } else {
        toast.error(data?.message || "Failed to create user");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create user";
      if (message.includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

//  OTP Match function for login
export const useMatchOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    resolver: zodResolver(OtpMatchSchema),
    defaultValues: {
      email,

      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,

        otp0: "",
        otp1: "",
        otp2: "",
        otp3: "",
      });
    }
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const otp =
        `${formData.otp0}${formData.otp1}${formData.otp2}${formData.otp3}`
          .replace(/\s/g, "")
          .toUpperCase();

      const payload = {
        email: formData.email,
        otp,
      };

      const { data } = await axiosPublic.post("/verify-email", payload);

      return { data, otp };
    },
    onSuccess: ({ data, otp }) => {
      navigate("/sign-in", {
        state: {
          email: form.watch("email"),
          otp: otp,
        },
      });

      // Store email and otp in sessionStorage
      sessionStorage.setItem("reset_email", email);
      sessionStorage.setItem("reset_otp", otp);

      toast.success(data.message || "OTP Verified");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "OTP verification failed");
    },
  });

  return {
    form,
    matchOtp: mutate,
    isMatching: isPending,
  };
};

//Re-send otp

export const useSendOtp = () => {
  const navigate = useNavigate();
  const form = useForm({
    //resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      const payload = {
        email: email,
      };
      const { data } = await axiosPublic.post("/resend-otp", payload);
      if (!data?.status) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        navigate("/otp-verify", {
          state: { email: form.watch("email") },
        });
        toast.success(data?.message || "OTP sent successfully");
      } else {
        toast.error("error");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Failed to send OTP");
    },
  });

  return { form, mutate, isPending };
};

//forget-password
export const useForgetPassword = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(forgetPassword),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      const payload = {
        email: email,
      };
      const { data } = await axiosPublic.post("/forget-password", payload);
      if (!data?.status) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        navigate("/otp-verify-forget-password", {
          state: { email: form.watch("email") },
        });
        toast.success(data?.message || "OTP sent successfully");
      } else {
        toast.error("error");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Failed to send OTP");
    },
  });

  return { form, mutate, isPending };
};
//  OTP Match function for forget password
export const useMatchOtpForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    resolver: zodResolver(OtpMatchSchema),
    defaultValues: {
      email,

      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,

        otp0: "",
        otp1: "",
        otp2: "",
        otp3: "",
      });
    }
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const otp =
        `${formData.otp0}${formData.otp1}${formData.otp2}${formData.otp3}`
          .replace(/\s/g, "")
          .toUpperCase();

      const payload = {
        email: formData.email,
        otp,
      };

      const { data } = await axiosPublic.post("/verify-otp", payload);
      const { token, message } = data;
      return { data, otp, token, message };
    },
    onSuccess: ({ data, otp, token }) => {
      navigate("/confirm-password", {
        state: {
          email: form.watch("email"),
          otp: otp,
          token: token,
        },
      });

      // Store email and otp in sessionStorage
      sessionStorage.setItem("reset_email", email);
      sessionStorage.setItem("reset_otp", otp);
      sessionStorage.setItem("reset_token", data?.token);

      toast.success(data.message || "OTP Verified");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "OTP verification failed");
    },
  });

  return {
    form,
    matchOtp: mutate,
    isMatching: isPending,
  };
};
//  Reset-password function
export const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get from state, fallback to sessionStorage
  const email =
    location.state?.email || sessionStorage.getItem("reset_email") || "";
  const otp = location.state?.otp || sessionStorage.getItem("reset_otp") || "";
  const token =
    location.state?.token || sessionStorage.getItem("reset_token") || "";
  // Store in sessionStorage so it survives refresh
  useEffect(() => {
    if (email) sessionStorage.setItem("reset_email", email);
    if (otp) sessionStorage.setItem("reset_otp", otp);
    if (token) sessionStorage.setItem("reset_token", token);
  }, [email, otp, token]);

  const form = useForm({
    defaultValues: {
      email,
      otp,
      password: "",
      password_confirmation: "",
      token,
    },
  });

  useEffect(() => {
    if (email && otp) {
      form.reset({
        email,
        otp,
        password: "",
        password_confirmation: "",
        token,
      });
    }
  }, [email, otp, token]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const values = form.getValues();

      const payload = {
        email: values.email,
        otp: values.otp,
        password: values.password,
        password_confirmation: values.password_confirmation,
        token: values.token,
      };

      console.log("Submitting payload:", payload);

      const { data } = await axiosPublic.post("/reset-password", payload);

      if (!data?.status) {
        throw new Error(data?.message || "Reset failed");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful");
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_otp");
      navigate("/confirmation");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Password reset failed");
    },
  });

  return {
    form,
    mutate,
    isResetting: isPending,
  };
};

export const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/me");
      return res.data;
    },
    refetchOnWindowFocus: false, // Optional config
  });

  return { user: data?.data, isLoading };
};
