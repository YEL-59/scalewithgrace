import z from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("email is required").email("Give proper email"),
  password: z
    .string()
    .nonempty("password is required")
    .min(6, "password shoulb be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "First name is required"),

    email: z.string().min(1, "Email is required").email("Invalid email"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    password_confirmation: z.string().min(1, "Confirm Password is required"),

    // terms_and_conditions: z
    //   .boolean()
    //   .refine((val) => val === true, "agree to the Terms & Conditions"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });
export const OtpMatchSchema = z.object({
  email: z.string().email(),
  otp0: z.string().min(1).max(1),
  otp1: z.string().min(1).max(1),
  otp2: z.string().min(1).max(1),
  otp3: z.string().min(1).max(1),
});

export const forgetPassword = z.object({
  email: z.string().nonempty("email is required").email("Give proper email"),
});
