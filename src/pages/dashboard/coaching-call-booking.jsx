import React from 'react';
import { Link } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";


const CoachingCallBooking = () => {

    const navigationMenuItems = [
        { title: "AI Expert", href: "#", isActive: true },
        { title: "Software Engineer", href: "#", },
        { title: "Architecture", href: "#" },
        { title: "Art & Media", href: "#"},
        { title: "Urbarn Designer", href: "#" },
        { title: "Metropolitan Architect", href: "#" },
    ];


    return (
        <div className='bg-[#F9F9F9] font-poppins'>
            <div className='w-11/12 mx-auto py-11'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-xl md:text-3xl lg:text-4xl xl:text-[40px] font-semibold text-[#191919]'>Coaching call booking</h1>
                        <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-[#717171] mt-3'>Let’s take the next step.</p>
                    </div>

                    <Link>
                        <button className='py-4 px-4 bg-gradient-to-r from-primary to-secondary rounded-[100px] flex items-center justify-center gap-2'>
                            <span className='text-white font-medium text-sm md:text-base lg:text-lg'>View Coaching Schedule</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear_8836_7786)" />
                                <path d="M13.5469 5.57422L20.0002 11.9998L13.5469 18.4265" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 12H4" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <defs>
                                    <linearGradient id="paint0_linear_8836_7786" x1="29.5349" y1="12.0494" x2="-3.22897" y2="13.6619" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#504999" />
                                        <stop offset="1" stop-color="#44A199" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>

                    </Link>
                </div>

                <NavigationMenu className='my-6 md:my-8 lg:my-10 xl:my-12'>
                    <NavigationMenuList>
                        {navigationMenuItems.map((item) => (
                            <NavigationMenuItem key={item.title}>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "flex flex-col h-auto items-center px-5 py-2.5 bg-transparent hover:bg-white hover:border border-secondary rounded-[39px]"
                                    )}
                                    active={item.isActive}
                                    asChild
                                >
                                    <Link className='text-sm md:text-base lg:text-lg font-bold text-[#717171]' href={item.href}>
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
        </div>
    );
};

export default CoachingCallBooking;