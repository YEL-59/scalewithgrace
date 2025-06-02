import image1 from '@/assets/images/1.png';
import image2 from '@/assets/images/2.png';
import image3 from '@/assets/images/3.png';
import image4 from '@/assets/images/4.png';
// import image3 from "@/assets/images/3.png";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router';
// import image4 from "@/assets/images/4.png";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full bg-[#F1F4FF] pt-7   md:pt-10  lg:pt-16 xl:pt-[106px] font-poppins"
    >
      <div className="container mx-auto">
        {/* image showing with shadcn ui blocks */}
        <div
          className="flex items-center justify-center mx-auto text-center"
          data-aos="fade-down"
        >
          <Avatar className="-ml-4 first:ml-0 cursor-pointer border-2 border-white">
            <AvatarImage src={image4} alt="@shadcn" />
            <AvatarFallback className="bg-indigo-500 text-white">
              CN
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-4 first:ml-0 cursor-pointer border-2 border-white">
            <AvatarImage src={image3} alt="@shadcn" />
            <AvatarFallback className="bg-green-600 text-white">
              CN
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-4 first:ml-0 cursor-pointer border-2 border-white">
            <AvatarImage src={image2} alt="@shadcn" />
            <AvatarFallback className="bg-red-500 text-white">
              AB
            </AvatarFallback>
          </Avatar>
          <Avatar className="-ml-4 first:ml-0 cursor-pointer border-2 border-white">
            <AvatarImage src={image1} alt="@shadcn" />
            <AvatarFallback className="bg-indigo-500 text-white">
              VK
            </AvatarFallback>
          </Avatar>

          <p className="ml-2 text-sm md:text-base font-read text-[#0D1117]">
            10k+ people using Karially ai
          </p>
        </div>

        {/* image showing manually */}
        {/* <div className="flex justify-center items-center">
          <div className="">
            <img
              className="w-8 h-8  rounded-full border-2 border-white "
              src={image4}
            ></img>
          </div>
          <div className="-ml-3">
            <img
              className="w-8 h-8  rounded-full border-2 border-white "
              src={image3}
            ></img>
          </div>
          <div className="-ml-3">
            <img
              className="w-8 h-8  rounded-full border-2 border-white "
              src={image2}
            ></img>
          </div>
          <div className="-ml-3">
            <img
              className="w-8 h-8  rounded-full border-2 border-white "
              src={image1}
            ></img>
          </div>

          <p className="ml-1 font-read text-[#0D1117]">
            10k+ people using Karially ai
          </p>
        </div> */}

        {/* hero content */}

        <div className="text-center pb-6">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-medium text-center leading-11 md:leading-12 lg:leading-16 xl:leading-20 mt-2"
            data-aos="fade-left"
          >
            Your next career move shouldn’t be a guess
          </h1>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-medium text-center leading-11 md:leading-12 lg:leading-16 xl:leading-20 mb-[26px] text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"
            data-aos="fade-right"
          >
            Karially gives you the plan
          </h2>{' '}
          <p className=" text-[#6C6C6C] text-lg md:text-xl lg:text-2xl leading-[34px]">
            Karially helps you get clarity on where you’re going, how to get
            there, and what to do next, <br className="hidden lg:block"></br>{' '}
            without overwhelm. We’re not a job board. Not a resume builder.
            We’re your career ally.
          </p>
          <Link to="/coming">
            <button
              className="font-read flex mx-auto items-center gap-1 md:gap-2 py-2 px-3 md:py-3 lg:px-7 xl:px-[45px] rounded-[100px] text-sm md:text-base lg:text-lg font-medium lg:font-semibold mt-7 md:mt-10  lg:mt-[45px] text-white bg-gradient-to-r  from-primary to-secondary"
              data-aos="zoom-in"
            >
              <button> Start a free trial</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.0013 7L18.0013 12M18.0013 12L13.0013 17M18.0013 12H2.66797"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
