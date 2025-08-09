import { Outlet } from "react-router";
import authdash from "@/assets/images/authdashboard.svg";
import authdash2 from "@/assets/images/authdash2.svg";
import authexpand from "@/assets/images/authexpanded.svg";
import useScrollToTop from "@/hooks/scroll-top-hook";

export default function AuthLayout() {
  useScrollToTop();
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center px-6 py-10 overflow-auto">
        <Outlet />
      </div>

      {/* Right Side - Illustrations (Only visible on lg and above) */}
      <div className="hidden lg:flex bg-[#EDFCFF] rounded-l-[20px] relative items-end justify-center overflow-hidden">
        {/* Main Dashboard Image */}
        <img
          src={authdash}
          alt="Dashboard 1"
          className="absolute bottom-0 right-0 w-4/5 xl:w-auto z-10"
        />

        {/* Layered Illustration */}
        <div className="relative ">
          <img src={authdash2} alt="Dashboard 2" className="mt-20 z-20" />
          <div className="absolute bottom-0 left-3">
            <img src={authexpand} alt="Expanded Graphic" className="z-30" />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white z-40"></div>

        {/* Desktop Text */}
        <div className="absolute bottom-6 left-6 z-50">
          <h1 className="font-medium text-[#1E1E1E] text-[22px] xl:text-[26px]">
            Sign in to Karially
          </h1>
          <p className="text-[#959595] text-base xl:text-lg">
            Your smart companion for career growth and productivity.
          </p>
        </div>
      </div>
    </div>
  );
}
