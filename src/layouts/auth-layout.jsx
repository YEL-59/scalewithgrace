import { Outlet } from "react-router";
import authdash from "@/assets/images/authdashboard.svg";
import authdash2 from "@/assets/images/authdash2.svg";
import authexpand from "@/assets/images/authexpanded.svg";

export default function AuthLayout() {
  return (
    <div className="py-10 h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <Outlet />
      </div>

      <div className="h-full w-full">
        <div className="hidden bg-[#EDFCFF] rounded-[20px] md:flex relative lg:h-5/6">
          <div>
            <img className="w-4/5 md:w-full xl:w-fit  absolute z-30 bottom-0 right-0" src={authdash}></img>
          </div>

          <div className="relative overflow-hidden">
            <img className="z-40 lg:ml-0 md:mt-30 lg:mt-20 xl:m-0" src={authdash2}></img>
            <div className="absolute -bottom-64 md:-bottom-48 lg:-bottom-44 xl:bottom-0 left-3 z-50">
              <img className="" src={authexpand}></img>
            </div>

          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white z-60 "></div>
        </div>
        <p className="font-medium text-[#1E1E1E] text-lg md:text-xl lg:text-[22px] xl:text-[26px]">Sign in to Karially</p>
        <p className="text-[#959595] text-sm md:text-base lg:text-lg">Your smart companion for career growth and productivity.</p>
      </div>
    </div>
  );
}
