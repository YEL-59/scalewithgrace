import React from "react";
import footerLogo from "../../assets/images/footer-logo.svg";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white font-read">
      <div className="w-11/12 mx-auto py-6 md:py-8 lg:py-12 xl:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-40 border-b border-[#45494F] py-16">

          <div className="flex-2/5 text-sm md:text-[16.5px] lg:text-[18.5px] xl:text-[19px]">
            <img src={footerLogo}></img>
            <p className="mt-6 md:mt-9 lg:mt-11  xl:mt-[52px]">
              Join our newsletter to stay up to date on features and releases.
            </p>

            <div className="mt-5 flex gap-3 lg:gap-4 xl:gap-5 font-poppins">
              <input placeholder="Enter Your Mail" className="border border-[#717171] rounded-[133px] py-3 px-4 md:py-4 md:px-5 w-full text-start">
              </input>
              <button className="bg-gradient-to-r border-black from-primary to-secondary py-3 px-4 md:py-4 md:px-8 rounded-[133px]">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex-3/5 text-sm md:text-[17.5px] lg:text-[19.5px] xl:text-[21.5px] grid grid-cols-3 gap-4 md:gap-10 lg:gap-12  xl:gap-[53px]">
            {/* Company List */}
            <div className="">
              <h6 className="font-medium">Company</h6>
              <div className="mt-[21.5px] font-light flex flex-col gap-2.5">
                <Link to='/'>Home</Link>
                <Link to='#'>About Us</Link>
                <Link to="#">Features</Link>
                <Link to='#'>Pricing</Link>
                <Link to='#'>Contact</Link>
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
              <div className="mt-[21.5px] font-light flex flex-col gap-2.5">
                {/* facebook */}
                <Link className="flex items-center gap-1 md:gap-2">
                  <svg
                    className="size-5 md:size-6 xl:size-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <path
                      d="M29.5534 17.0701C29.5534 9.66129 23.5839 3.65527 16.2201 3.65527C8.85625 3.65527 2.88672 9.66129 2.88672 17.0701C2.88672 23.7657 7.76251 29.3155 14.1367 30.3219V20.9478H10.7513V17.0701H14.1367V14.1146C14.1367 10.7526 16.1274 8.89543 19.1729 8.89543C20.6318 8.89543 22.1575 9.15745 22.1575 9.15745V12.4588H20.4763C18.8201 12.4588 18.3034 13.4929 18.3034 14.5538V17.0701H22.0013L21.4102 20.9478H18.3034V30.3219C24.6777 29.3155 29.5534 23.7659 29.5534 17.0701Z"
                      fill="#E9E9EA"
                    />
                  </svg>
                  Facebook
                </Link>

                {/* instagram */}
                <Link className="flex items-center gap-1 md:gap-2">
                  <svg
                  className="size-5 md:size-6 xl:size-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.5521 4.65723H10.8854C7.20352 4.65723 4.21875 7.642 4.21875 11.3239V21.9906C4.21875 25.6724 7.20352 28.6572 10.8854 28.6572H21.5521C25.2339 28.6572 28.2188 25.6724 28.2188 21.9906V11.3239C28.2188 7.642 25.2339 4.65723 21.5521 4.65723ZM25.8854 21.9906C25.8781 24.3807 23.9422 26.3166 21.5521 26.3239H10.8854C8.49522 26.3166 6.5594 24.3807 6.55208 21.9906V11.3239C6.5594 8.93369 8.49522 6.99788 10.8854 6.99056H21.5521C23.9422 6.99788 25.8781 8.93369 25.8854 11.3239V21.9906ZM22.5521 11.6572C23.2885 11.6572 23.8854 11.0603 23.8854 10.3239C23.8854 9.58752 23.2885 8.99056 22.5521 8.99056C21.8157 8.99056 21.2188 9.58752 21.2188 10.3239C21.2188 11.0603 21.8157 11.6572 22.5521 11.6572ZM16.2188 10.6572C12.905 10.6572 10.2188 13.3435 10.2188 16.6572C10.2188 19.971 12.905 22.6572 16.2188 22.6572C19.5325 22.6572 22.2188 19.971 22.2188 16.6572C22.2224 15.0648 21.5913 13.5367 20.4653 12.4107C19.3393 11.2847 17.8112 10.6537 16.2188 10.6572ZM12.5521 16.6572C12.5521 18.6823 14.1937 20.3239 16.2188 20.3239C18.2438 20.3239 19.8854 18.6823 19.8854 16.6572C19.8854 14.6322 18.2438 12.9906 16.2188 12.9906C14.1937 12.9906 12.5521 14.6322 12.5521 16.6572Z"
                      fill="#E9E9EA"
                    />
                  </svg>
                  Instagram
                </Link>

                {/* LinkedIn */}
                <Link className="flex items-center gap-1 md:gap-2">
                  <svg
                   className="size-5 md:size-6 xl:size-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.21875 4.32324C5.11418 4.32324 4.21875 5.21867 4.21875 6.32324V26.3232C4.21875 27.4278 5.11418 28.3232 6.21875 28.3232H26.2188C27.3233 28.3232 28.2188 27.4278 28.2188 26.3232V6.32324C28.2188 5.21867 27.3233 4.32324 26.2188 4.32324H6.21875ZM11.5798 9.6602C11.5873 10.9352 10.6329 11.7208 9.50039 11.7152C8.43351 11.7096 7.50351 10.8602 7.50914 9.66208C7.51476 8.5352 8.40539 7.62958 9.56227 7.65583C10.736 7.68208 11.5873 8.54271 11.5798 9.6602ZM16.5917 13.3389H13.2317H13.2298V24.752H16.781V24.4858C16.781 23.9792 16.7806 23.4726 16.7802 22.9658C16.7792 21.614 16.778 20.2608 16.7849 18.9095C16.7867 18.5814 16.8017 18.2402 16.8861 17.927C17.2029 16.757 18.2549 16.0014 19.4286 16.1871C20.1824 16.3051 20.681 16.742 20.891 17.4527C21.0205 17.897 21.0786 18.3751 21.0842 18.8383C21.0994 20.2351 21.0973 21.6319 21.0951 23.0288C21.0944 23.5219 21.0936 24.0152 21.0936 24.5083V24.7502H24.6561V24.4764C24.6561 23.8738 24.6558 23.2712 24.6554 22.6687C24.6547 21.1627 24.6539 19.6567 24.6579 18.1502C24.6598 17.4695 24.5868 16.7983 24.4198 16.1402C24.1705 15.1614 23.6549 14.3514 22.8167 13.7664C22.2223 13.3502 21.5698 13.082 20.8405 13.052C20.7574 13.0486 20.6737 13.0441 20.5896 13.0395C20.2166 13.0194 19.8376 12.9989 19.481 13.0708C18.461 13.2752 17.5649 13.742 16.8879 14.5651C16.8093 14.6595 16.7324 14.7554 16.6175 14.8984L16.5917 14.9308V13.3389ZM7.79427 24.7558H11.3286V13.3463H7.79427V24.7558Z"
                      fill="#E9E9EA"
                    />
                  </svg>
                  LinkedIn
                </Link>

                {/*Youtube  */}
                <Link className="flex items-center gap-1 md:gap-2">
                  <svg
                    className="size-5 md:size-6 xl:size-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <path
                      d="M29.006 10.2704C28.8541 9.70689 28.5573 9.19302 28.1451 8.77991C27.7329 8.36679 27.2197 8.06883 26.6566 7.91568C24.5686 7.34235 16.2153 7.33302 16.2153 7.33302C16.2153 7.33302 7.86328 7.32368 5.77395 7.87168C5.21118 8.03188 4.69905 8.33405 4.2867 8.7492C3.87436 9.16434 3.57566 9.67851 3.41928 10.2424C2.86862 12.3304 2.86328 16.661 2.86328 16.661C2.86328 16.661 2.85795 21.013 3.40462 23.0797C3.71128 24.2224 4.61128 25.125 5.75528 25.433C7.86462 26.0064 16.1953 26.0157 16.1953 26.0157C16.1953 26.0157 24.5486 26.025 26.6366 25.4784C27.1999 25.3255 27.7136 25.0282 28.1268 24.6159C28.54 24.2037 28.8385 23.6907 28.9926 23.1277C29.5446 21.041 29.5486 16.7117 29.5486 16.7117C29.5486 16.7117 29.5753 12.3584 29.006 10.2704ZM13.5433 20.673L13.55 12.673L20.4926 16.6797L13.5433 20.673Z"
                      fill="#E9E9EA"
                    />
                  </svg>
                  Youtube
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm md:text-[16.5px] lg:text-[18.5px] mt-7 md:mt-8 lg:mt-9 xl:mt-[42px]">© 2025 Karially. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
