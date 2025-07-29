import React from "react";
import footerLogo from "@/assets/images/footer-logo.svg";
import { Link } from "react-router";
import { useGetSystemSection } from "@/hooks/system.hook";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/useNewsletter";

export default function Footer() {
  const { data, isLoading } = useGetSystemSection("system-info");
  const { data: social_link } = useGetSystemSection("social-link");
  console.log({ data });
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubscribe = () => {
    if (!email) return toast.error("Please enter your email");
    subscribe(email);
    setEmail("");
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <footer className="bg-[#191919] text-white font-read">
      <div className="w-11/12 mx-auto py-6 md:py-8 lg:py-12 xl:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-40 border-b border-[#45494F] py-16">
          <div className="flex-2/5 text-sm md:text-[16.5px] lg:text-[18.5px] xl:text-[19px]">
            <img src={data?.logo || footerLogo}></img>
            <p className="mt-6 md:mt-9 lg:mt-11  xl:mt-[52px]">
              {data?.description ||
                " Join our newsletter to stay up to date on features and releases."}
            </p>

            <div className="mt-5 flex gap-3 lg:gap-4 xl:gap-5 font-poppins">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail"
                className="border border-[#717171] rounded-[133px] py-3 px-4 md:py-4 md:px-5 w-full text-start"
              />
              <button
                disabled={isPending}
                onClick={handleSubscribe}
                className="bg-gradient-to-r border-black from-primary to-secondary py-3 px-4 md:py-4 md:px-8 rounded-[133px] disabled:opacity-60"
              >
                {isPending ? "Submitting..." : "Subscribe"}
              </button>
            </div>
          </div>

          <div className="flex-3/5 text-sm md:text-[17.5px] lg:text-[19.5px] xl:text-[21.5px] grid grid-cols-3 gap-4 md:gap-10 lg:gap-12  xl:gap-[53px]">
            {/* Company List */}
            <div className="">
              <h6 className="font-medium">Company</h6>
              <div className="mt-[21.5px] font-light flex flex-col gap-2.5">
                <Link to="/">Home</Link>
                <Link to="#">About Us</Link>
                <Link to="#">Features</Link>
                <Link to="#">Pricing</Link>
                <Link to="#">Contact</Link>
              </div>
            </div>

            {/* others list */}
            <div className="">
              <h6 className="font-medium">Others</h6>
              <div className="mt-[21.5px] font-light flex flex-col gap-2.5">
                <Link>Privacy policy</Link>
                <Link>Terms of policies</Link>
                <Link>Cookies settings</Link>
              </div>
            </div>

            {/* follow us list */}
            <div className="">
              <h6 className="font-medium">Follow Us</h6>

              {social_link?.map((content, id) => (
                <div
                  key={id}
                  className="mt-[21.5px] font-light flex flex-col gap-2.5"
                >
                  <a
                    href={content.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <img
                      src={content.image}
                      alt={content.title}
                      className="h-10 w-10"
                    />
                    {content.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm md:text-[16.5px] lg:text-[18.5px] mt-7 md:mt-8 lg:mt-9 xl:mt-[42px]">
          {data?.copyright_text || "© 2025 Karially. All Rights Reserved."}
        </p>
      </div>
    </footer>
  );
}
