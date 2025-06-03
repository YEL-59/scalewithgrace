// import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
// import { z } from "zod";


function OtpVarification() {

    const [otp, setOtp] = useState(new Array(4).fill(""))


    const {
        register,
        setValue,
        handleSubmit,
    } = useForm();


    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) {
            return false;
        }

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        setValue(`digit${index}`, value); 
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    }

    const onSubmit = (data) => {
        const otpCode = `${data.digit0}${data.digit1}${data.digit2}${data.digit3}`;
        console.log(otpCode);
    };
    return (
        <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto p-4 md:p-6 lg:p-8 xl:p-10">

            {/* Sign-in form */}
            <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
                <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center">
                    OTP varification
                </h2>
                <p className="text-[#959595] text-xs md:text-sm lg:text-base text-center">
                    We have sent a verification code to email address
                </p>

                <p className="text-[#959595] text-xs md:text-sm lg:text-base text-center">
                    tahsankhan380@gmail.com <Link className="text-secondary">Wrong Email?</Link>
                </p>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 md:mt-10 lg:mt-12  xl:mt-[54px]"
                >
                    <div className="grid grid-cols-4 gap-5">
                        {otp.map((data, i) => (
                            <input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                value={data}
                                maxLength={1}
                                {...register(`digit${i}`)}
                                onChange={(e) => handleChange(e, i)}
                                className="border rounded-[100px] py-2 px-4 max-w-[90px] text-center focus:bg-[#F6F8FE] focus:border-[#B4CAF3]"
                            />
                        ))}
                    </div>

                    <button className="bg-gradient-to-r from-primary to-secondary w-full rounded-md py-4 text-white text-base lg:text-lg mt-[54px]">
                        <input type="submit" />
                    </button>
                </form>

                <p className="text-[#959595] text-base lg:text-lg text-center mt-6">
                    Didn’t received the email? <Link className="text-primary">Resend</Link>
                </p>
            </div>
        </div>
    )
}

export default OtpVarification;