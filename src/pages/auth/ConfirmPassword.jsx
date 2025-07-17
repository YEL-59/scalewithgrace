import React, { useState } from "react";
import { useResetPassword } from "@/hooks/auth.hook";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

function ConfirmPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordVisibility2 = () => setShowPassword2((prev) => !prev);

  const { form, mutate } = useResetPassword();

  const onSubmit = () => {
    mutate();
  };

  return (
    <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
      <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
        <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] text-center font-bold">
          Create a New <br /> password
        </h2>
        <p className="text-[#4E504F] text-xs md:text-sm lg:text-base xl:text-lg text-center my-2">
          Set your new password with minimum 8 characters <br />
          with a combination of letters and numbers
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Field */}
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
                        placeholder="Enter your password"
                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none py-5"
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-transparent hover:bg-transparent"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none py-5"
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={togglePasswordVisibility2}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-transparent hover:bg-transparent"
                        tabIndex={-1}
                      >
                        {showPassword2 ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-4 text-white text-base lg:text-lg mt-[54px]"
            >
              Confirm Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ConfirmPassword;
