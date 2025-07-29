import React from "react";
import logo from "../../assets/images/logosvg.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useGoogleSignIn, useSignIn } from "@/hooks/auth.hook";
import GoogleIcon from "@/assets/svg/google-icon";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const googleSignIn = useGoogleSignIn();
  const { form, mutate } = useSignIn();
  const onSubmit = (data) => {
    mutate(data);
    console.log(data);
  };

  return (
    <div className="font-poppins  mx-auto">
      <img className="mx-auto" src={logo}></img>

      {/* Sign-in form */}
      <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
        <h2 className="text-2xl  xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold">
          Welcome Back
        </h2>
        <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center pb-10">
          enter your email and password to access your account
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none  py-5"
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between mt-3  text-[#1E1E1E] text-base font-medium leading-none">
              <label className="flex items-center gap-3 ">
                <input type="checkbox"></input>
                remember me
              </label>

              <button>
                <Link to="/forgot-password">Forget Password?</Link>
              </button>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-7 text-white text-base lg:text-lg mt-[54px]"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <button
          onClick={googleSignIn}
          className="w-full border-2 border-[#E4E4E4] text-[#959595] flex items-center gap-3 mt-3 rounded-[60px] py-3 text-center justify-center text-base lg:text-lg mb-8 md:mb-10 lg:mb-12  xl:mb-[54px]"
        >
          <GoogleIcon />
          Sign In with Google
        </button>

        <p className="text-[#959595] text-base lg:text-lg text-center">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-[#1E1E1E]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
