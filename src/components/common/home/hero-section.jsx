import React from "react";
import image1 from "../../../assets/images/1.png";
import image2 from "../../../assets/images/2.png";
// import image3 from "../../../assets/images/3.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import image4 from "../../../assets/images/4.png";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-[#F1F4FF]">
      <div className="container">
         <div className="flex">

        
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-indigo-500 text-white">VK</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-orange-500 text-white">RS</AvatarFallback>
      </Avatar>
  
         </div>

        {/* image showing */}
        <div className="flex justify-center items-center relative">
          <div className="absolute top-1/2 left-1/2 z-10">
            <img className="w-8 h-8 rounded-full" src={image1}></img>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
            <img className="w-8 h-8 rounded-full " src={image2}></img>
          </div>
        </div>
      </div>
    </section>
  );
}
