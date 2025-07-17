import logo from "@/assets/images/logosvg.svg";
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
import { useForgetPassword } from "@/hooks/auth.hook";
import { useNavigate } from "react-router";

import { Link } from "react-router";

function ForgotPassword() {
  const { form, mutate } = useForgetPassword();

  const onSubmit = (data) => {
    mutate(data);
  };
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("sign-in");
  };

  return (
    <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
      <img className="mx-auto" src={logo}></img>
      {/* Sign-in form */}
      <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
        <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold">
          Forget Password
        </h2>
        <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center pb-8">
          enter your email to reset password
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

            <Button className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-6 text-white text-base lg:text-lg mt-[54px]">
              <input type="submit" value="Forgot Password" />
            </Button>
          </form>
        </Form>

        <button
          onClick={handleSignIn}
          className="w-full border-2 border-[#E4E4E4] text-[#959595] flex items-center gap-3 mt-3 rounded-[60px] py-3 text-center justify-center text-base lg:text-lg"
        >
          <Link to="/forgot-password/sign-in"> Back To Sign In</Link>
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
