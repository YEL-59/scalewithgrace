import { Outlet } from "react-router";
import authdash from "@/assets/images/authdashboard.svg";
import authdash2 from "@/assets/images/authdash2.svg";
import authexpand from "@/assets/images/authexpanded.svg";

export default function AuthLayout() {
  return (
    <div className="py-10 md:py-12 lg-py-14 xl:py-16 grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Outlet />
      </div>

      <div className="bg-[#EDFCFF] rounded-[20px] flex relative pt-5 w-full">
        <div>
          <img className="absolute z-30 bottom-0 right-0" src={authdash}></img>
        </div>

        <div className="relative">
          <img src={authdash2}></img>
          <div className="absolute bottom-0 left-0 z-50">
            <img src={authexpand}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
