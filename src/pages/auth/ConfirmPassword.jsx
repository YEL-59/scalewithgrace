import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";


// form validation using zod
const signInSchema = z.object({
    password: z.string().nonempty("password is required").min(6, "password shoulb be at least 6 characters"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "password have to match",
        path: ["confirmPassword"]
    });


function ConfirmPassword() {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword2, setShowPassword2] = useState(false);
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
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
        <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
            {/* Sign-in form */}
            <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
                <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] text-center font-bold">
                    Create a New <br></br>password
                </h2>
                <p className="text-[#4E504F] text-xs md:text-sm lg:text-base xl:text-lg text-center my-2">
                    Set your new password with minimum 8 characters <br></br> with a combination of letters and numbers
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="my-8 md:my-10 lg:my-12  xl:my-[54px]"
                >



                    <div className="mt-5">
                        <p>New Password</p>
                        <label className="bg-[#EDFCFF] p-3 w-full relative flex items-center rounded-[60px] border mt-2 focus-within:ring-1 focus-within:ring-ring px-2">
                            <LockIcon className="h-5 w-5 text-muted-foreground ml-2" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Password"
                                className="border-0 focus-visible:ring-0 shadow-none"
                            />
                            <button onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                )}
                            </button>
                        </label>
                        {errors.password && <p role="alert" className="text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <div className="mt-5">
                        <p>Confirmation New Password</p>
                        <label className="bg-[#EDFCFF] p-3 w-full relative flex items-center rounded-[60px] border mt-2 focus-within:ring-1 focus-within:ring-ring px-2">
                            <LockIcon className="h-5 w-5 text-muted-foreground ml-2" />
                            <Input
                                type={showPassword2 ? "text" : "password"}
                                {...register("confirmPassword")}
                                placeholder="Password"
                                className="border-0 focus-visible:ring-0 shadow-none"
                            />
                            <button onClick={togglePasswordVisibility2}>
                                {showPassword2 ? (
                                    <EyeOffIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-muted-foreground mr-2" />
                                )}
                            </button>
                        </label>

                        {errors.confirmPassword && <p role="alert" className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>


                    <button className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-4 text-white text-base lg:text-lg mt-[54px]">
                        <Link to='/confirmation'> <input type="submit" /></Link>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default ConfirmPassword;