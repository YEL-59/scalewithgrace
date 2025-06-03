import logo from '@/assets/images/logosvg.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';



// form validation using zod
const signInSchema = z.object({
    email: z.string().nonempty("email is required").email("Give proper email"),
});


function ForgotPassword() {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('sign-in');
    }


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(signInSchema)
    });
    const onSubmit = (data) => console.log("data from", data);

    return (
        <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
            <img className="mx-auto" src={logo}></img>
            {/* Sign-in form */}
            <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
                <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold">
                    Forget Password
                </h2>
                <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center">
                    enter your email to reset password
                </p>

                <form
                     onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 md:mt-10 lg:mt-12  xl:mt-[54px]"
                >


                    <div className="mt-3">
                        <label>
                            <span>Email</span>
                            <input
                                className="bg-[#EDFCFF] p-4 rounded-md w-full focus-visible:ring-0 shadow-none mt-2"
                                placeholder="Enter your mail"
                                {...register("email")}

                            />

                            {errors.email && (
                                <p role="alert" className="text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </label>
                    </div>

                    <button className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-4 text-white text-base lg:text-lg mt-[54px]">
                       <Link to='/check-mail'> <input type="submit" value="Forgot Password" /></Link>
                    </button>

                </form>

                <button onClick={handleSignIn} className="w-full border-2 border-[#E4E4E4] text-[#959595] flex items-center gap-3 mt-3 rounded-[60px] py-3 text-center justify-center text-base lg:text-lg">
                    <Link to='/forgot-password/sign-in'> Back To Sign In</Link>
                </button>
            </div>
        </div>
    )
}

export default ForgotPassword;
