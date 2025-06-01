import React from "react";
// import { useForm } from "react-hook-form";
import logo from "../../assets/images/logosvg.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { z } from "zod";

// form validation using zod
const signInSchema = z.object({
  email: z.string().nonempty("email is required").email("Give proper email"),
  password: z.string().nonempty("password is required").min(6, "password shoulb be at least 6 characters"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInSchema)
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="font-poppins w-11/12 lg:w-1/2 mx-auto">
      <img className="mx-auto" src={logo}></img>

      {/* Sign-in form */}
      <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
        <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center">
          Welcome Back
        </h2>
        <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center">
          enter your email and password to access your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-8 md:my-10 lg:my-12  xl:my-[54px]"
        >
          <label>
            <span>Email</span>
            <input
              className="bg-[#EDFCFF] p-4 rounded-md w-full focus-visible:ring-0 shadow-none mt-2"
              placeholder="Enter your mail"
              {...register("email")}
              // aria-invalid={errors.email ? "true" : "false"}
            />

            {
              errors.email && <p role="alert" className="text-sm text-red-600">{errors.email.message}</p>
            }
          </label>

          <div className="mt-5">
            <p>Password</p>
            <label className="bg-[#EDFCFF] p-3 w-full relative flex items-center rounded-md border mt-2">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="border-0 focus-visible:ring-0 shadow-none"
              />
              <button onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </label>
           

            {errors.password && <p role="alert" className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div className="font-medium flex items-center justify-between mt-3">
            <label className="flex items-center gap-3">
              <input type="checkbox"></input>
              remember me
            </label>

            <button>Forget Password?</button>
          </div>

          <button className="bg-gradient-to-r from-primary to-secondary w-full rounded-md py-4 text-white text-base lg:text-lg mt-[54px]">
            <input type="submit" />
          </button>

          <button className="w-full border-2 border-[#E4E4E4] text-[#959595] flex items-center gap-3 mt-3 rounded-md py-3 text-center justify-center text-base lg:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
            >
              <path
                d="M30.4994 17.1444C30.4994 15.9933 30.4041 15.1533 30.1978 14.2822H16.7852V19.4777H24.6581C24.4994 20.7689 23.6423 22.7133 21.7375 24.0199L21.7108 24.1939L25.9516 27.4135L26.2455 27.4422C28.9438 25 30.4994 21.4066 30.4994 17.1444Z"
                fill="#4285F4"
              />
              <path
                d="M16.7892 30.8328C20.6463 30.8328 23.8844 29.5883 26.2495 27.4416L21.7416 24.0193C20.5352 24.8438 18.9162 25.4193 16.7892 25.4193C13.0115 25.4193 9.80518 22.9771 8.66222 19.6016L8.49469 19.6155L4.08501 22.96L4.02734 23.1171C6.37652 27.6904 11.2019 30.8328 16.7892 30.8328Z"
                fill="#34A853"
              />
              <path
                d="M8.65866 19.602C8.35708 18.7309 8.18255 17.7975 8.18255 16.8331C8.18255 15.8686 8.35708 14.9353 8.6428 14.0642L8.63481 13.8786L4.16986 10.4805L4.02377 10.5486C3.05556 12.4464 2.5 14.5775 2.5 16.8331C2.5 19.0886 3.05556 21.2197 4.02377 23.1175L8.65866 19.602Z"
                fill="#FBBC05"
              />
              <path
                d="M16.7893 8.2463C19.4718 8.2463 21.2813 9.38185 22.3131 10.3308L26.3448 6.47301C23.8687 4.21746 20.6464 2.83301 16.7893 2.83301C11.2019 2.83301 6.37653 5.97521 4.02734 10.5485L8.64638 14.0641C9.80522 10.6886 13.0115 8.2463 16.7893 8.2463Z"
                fill="#EB4335"
              />
            </svg>
            Sign In with Google
          </button>
        </form>

        <p className="text-[#959595] text-base lg:text-lg text-center">
          Don't have an account? <Link className="text-[#1E1E1E]">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
