import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { useMatchOtp, useSendOtp } from "@/hooks/auth.hook";
import toast from "react-hot-toast";

function OtpVerification() {
  const { form, matchOtp, isMatching } = useMatchOtp();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]{0,1}$/.test(value)) return;

    form.setValue(`otp${index}`, value);

    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const onSubmit = (data) => {
    matchOtp(data);
  };
  const { sendOtp, isSending } = useSendOtp();

  const handleResend = () => {
    const email = form.watch("email");
    if (!email) return toast.error("No email found to resend OTP");
    sendOtp({ email });
  };
  return (
    <div className="font-poppins w-11/12 lg:w-3/4 xl:w-1/2 mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="mx-auto my-6 md:my-10">
        <h2 className="text-2xl md:text-3xl xl:text-5xl text-[#1E1E1E] text-center font-bold">
          OTP Verification
        </h2>
        <p className="text-[#959595] text-sm lg:text-base text-center">
          We have sent a verification code to your email
        </p>

        <p className="text-[#959595] text-sm lg:text-base text-center">
          {form.watch("email")}{" "}
          <Link className="text-secondary" to="/sign-up">
            Wrong Email?
          </Link>
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid gap-6"
        >
          <div className="grid grid-cols-4 gap-5 justify-center max-w-xs mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                className="border rounded-[100px] py-4 px-2 w-full text-center focus:bg-[#F6F8FE] focus:border-[#B4CAF3] text-lg"
                {...form.register(`otp${i}`)}
                onChange={(e) => handleChange(e, i)}
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isMatching}
            className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-5 text-white text-lg"
          >
            {isMatching ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* <p className="text-[#959595] text-base text-center mt-6">
          Didn’t receive the email?{" "}
          <button
            type="button"
            onClick={() => {
              // You can add resend logic here
            }}
            className="text-primary"
          >
            Resend
          </button>
        </p> */}
        <p className="text-[#959595] text-base lg:text-lg text-center mt-6">
          Didn’t receive the email?{" "}
          <button
            type="button"
            className="text-primary underline font-medium"
            onClick={handleResend}
            disabled={isSending}
          >
            {isSending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default OtpVerification;
