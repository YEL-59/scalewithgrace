import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import logo from "@/assets/images/logosvg.svg";
import { Link } from "react-router";
import { useSignUp } from "@/hooks/auth.hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/assets/svg/google-icon";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { form, mutate, isPending } = useSignUp();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
      <img className="mx-auto" src={logo}></img>
      {/* Sign-in form */}
      <div className="mx-auto my-4 ">
        <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold">
          Welcome Back
        </h2>
        <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center pb-7">
          enter your email and password to access your account
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Email
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
                        onClick={() => setShowPassword((prev) => !prev)}
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
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword1 ? "text" : "password"}
                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none  py-5"
                        placeholder="Enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword1((prev) => !prev)}
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

            <div className="font-medium flex items-center justify-between mt-1">
              <label className="flex items-center gap-3">
                <input type="checkbox"></input>
                <p className="text-[#717171] text-xs lg:text-sm">
                  I have read an agree to Karially{" "}
                  <span className="text-[#191919]">Terms</span> and{" "}
                  <span className="text-[#191919]">Privacy Policy</span>
                </p>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-7 text-white text-base lg:text-lg mt-[14px]"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <button className="w-full border-2 border-[#E4E4E4] text-[#959595] flex items-center gap-3 mt-3 rounded-[60px] py-3 text-center justify-center text-base lg:text-lg  ">
          <GoogleIcon />
          Sign In with Google
        </button>

        <p className="text-[#959595] text-base lg:text-lg text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-[#1E1E1E]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
