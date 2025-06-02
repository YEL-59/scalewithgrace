import { Outlet } from "react-router";
import authdash from "@/assets/images/authdashboard.svg";
import authdash2 from "@/assets/images/authdash2.svg";
import authexpand from "@/assets/images/authexpanded.svg";

export default function AuthLayout() {
  return (
    <div className="py-10 md:py-12 lg-py-14 xl:py-16 grid grid-cols-1 md:grid-cols-2">
      <div>
        <Outlet />
      </div>

      <div className="hidden bg-[#EDFCFF] rounded-[20px] md:flex relative pt-5 w-full">
        <div>
          <img className="w-4/5 md:w-full xl:w-fit  absolute z-30 bottom-0 right-0" src={authdash}></img>
        </div>

        <div className="relative overflow-hidden">
          <img className="z-40 lg:ml-0 md:mt-30 lg:mt-20 xl:m-0" src={authdash2}></img>
          <div className="absolute -bottom-64 md:-bottom-48 lg:-bottom-44 xl:bottom-0 left-3 z-50">
            <img className="" src={authexpand}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
