import { Link } from "react-router";

function CheckMail() {
    return (
        <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
            {/* Sign-in form */}
            <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
                <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold">
                    Check Your Mail
                </h2>
                <p className="text-[#959595] text-xs md:text-sm lg:text-base xl:text-lg text-center">
                    we have sent a password reset otp to your email Please <br></br> check your inbox
                </p>

                <button className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-4 text-white text-base lg:text-lg mt-[54px] mb-4">
                    <Link to='/otp'> <input type="submit" value="Open email" /></Link>
                </button>
                <button className="text-[#4E504F] mx-auto flex">Didn’t received the email? <span className="text-secondary">Resend</span></button>
            </div>
        </div>
    )
}


export default CheckMail;