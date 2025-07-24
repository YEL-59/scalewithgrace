import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import ProgressTracker from "./DashprogressTracker";
import Stepper from "./Stepper";
import { useGetDashboard } from "@/hooks/subscription.hook";

const CircularProgress = ({
  value,
  renderLabel,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  shape = "round",
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));

  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-[#E9E9EA]", className)}
        />

        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn("stroke-high-progress", progressClassName)}
        />
      </svg>
      {showLabel && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-md",
            labelClassName
          )}
        >
          {renderLabel ? renderLabel(value) : value}
        </div>
      )}
    </div>
  );
};

export default function MyDashboard() {
  const { data: dashboard } = useGetDashboard();

  const completedPercentage = dashboard?.completed_weekly_tasks_percentage ?? 0;
  const inProgressPercentage =
    dashboard?.in_progress_weekly_tasks_percentage ?? 0;

  console.log({ completedPercentage, inProgressPercentage });

  return (
    <div className="bg-[#F9F9F9] font-poppins">
      <div className="w-11/12 mx-auto py-8">
        <h1
          className="font-semibold text-2xl md:text-[38px] lg:text-[45px] xl:text-[60px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-2 text-[#191919]"
          data-aos="fade-right"
        >
          Welcome back, Scarlet
        </h1>
        <p className="text-[#717171] text-base md:text-lg lg:text-xl xl:text-2xl">
          Let’s take the next step in your career today
        </p>

        <ProgressTracker currentStage={2} overallProgress={33} />

        {/* upgrade cards part-1*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-8">
          {/* card 1 */}
          <div className="bg-gradient-to-r from-primary to-secondary p-11 relative rounded-[36px] text-white col-span-1 xl:col-span-2">
            <h4 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-semibold">
              Why upgrade Karially?
            </h4>
            <div className="absolute top-6 left-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="42"
                viewBox="0 0 45 42"
                fill="none"
              >
                <path
                  d="M24.822 35.4544C19.2522 34.7218 13.7166 33.8306 8.15924 32.8669"
                  stroke="white"
                  stroke-width="3.21791"
                  stroke-miterlimit="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.0805 24.5313C24.3297 21.7248 19.0388 18.0427 13.556 14.7133"
                  stroke="white"
                  stroke-width="3.21791"
                  stroke-miterlimit="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M38.6297 15.7749C35.453 11.6365 32.5873 7.0722 30.8186 2.21549"
                  stroke="white"
                  stroke-width="3.21791"
                  stroke-miterlimit="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl my-4">
              Unlock features that help you build a stronger resume, <br /> prep
              smarter for interviews.
            </p>

            <div className="bg-white rounded-[100px] py-[10px] px-4 mt-3 flex gap-4 items-center w-fit">
              <p className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-sm md:text-base lg:text-lg font-medium">
                Try for free
              </p>
              <button>
                <svg
                  className="bg-gradient-to-r from-primary to-secondary rounded-full p-2 size-9"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3.375 14.625L14.625 3.375M14.625 3.375V11.25M14.625 3.375H6.75"
                    stroke="white"
                    stroke-width="1.6875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* card-2 */}
          <div className="bg-white py-[34px] px-[28px] rounded-[36px] col-span-1">
            <div className="flex justify-between">
              <svg
                className="bg-[#DCDBEB] rounded-full p-5 size-20"
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.4081 21.95C20.6867 22.0565 20.9117 22.2692 21.0335 22.5415C21.1553 22.8138 21.164 23.1233 21.0576 23.402C20.0991 25.91 18.6411 27.293 16.8711 27.986C15.2331 28.625 13.4181 28.625 11.8536 28.625H11.7561C10.0761 28.625 8.66611 28.64 7.46011 29.111C6.35161 29.543 5.31811 30.41 4.55761 32.402C4.45099 32.6807 4.23804 32.9056 3.9656 33.0273C3.69315 33.1489 3.38354 33.1574 3.10486 33.0508C2.82618 32.9441 2.60128 32.7312 2.47961 32.4587C2.35795 32.1863 2.34949 31.8767 2.45611 31.598C3.41311 29.09 4.87111 27.707 6.64111 27.014C8.28061 26.375 10.0956 26.375 11.6586 26.375H11.7561C13.4361 26.375 14.8461 26.36 16.0521 25.889C17.1621 25.457 18.1956 24.59 18.9561 22.598C19.0626 22.3194 19.2754 22.0944 19.5476 21.9726C19.8199 21.8508 20.1294 21.8421 20.4081 21.9485V21.95ZM19.9281 3.875H26.0886C27.7881 3.875 29.1771 3.875 30.2736 4.022C31.4196 4.1765 32.4126 4.5095 33.2061 5.303C33.9981 6.0965 34.3311 7.088 34.4856 8.2355C34.6326 9.3305 34.6326 10.7195 34.6326 12.4205V15.581C34.6326 17.2805 34.6326 18.668 34.4856 19.766C34.3326 20.9105 33.9981 21.9035 33.2061 22.697C32.4141 23.4905 31.4196 23.8235 30.2736 23.978C29.1771 24.125 27.7881 24.125 26.0886 24.125H23.7561C23.4577 24.125 23.1716 24.0065 22.9606 23.7955C22.7496 23.5845 22.6311 23.2984 22.6311 23C22.6311 22.7016 22.7496 22.4155 22.9606 22.2045C23.1716 21.9935 23.4577 21.875 23.7561 21.875H26.0076C27.8076 21.875 29.0451 21.872 29.9736 21.7475C30.8691 21.6275 31.3086 21.4115 31.6146 21.1055C31.9206 20.801 32.1351 20.3615 32.2566 19.4645C32.3811 18.536 32.3841 17.3 32.3841 15.5V12.5C32.3841 10.7 32.3811 9.464 32.2566 8.5355C32.1366 7.6385 31.9206 7.2005 31.6146 6.8945C31.3086 6.5885 30.8691 6.3725 29.9736 6.2525C29.0436 6.128 27.8076 6.125 26.0091 6.125H20.0091C18.2091 6.125 16.9716 6.128 16.0431 6.2525C15.1476 6.3725 14.7081 6.5885 14.4021 6.8945C14.1411 7.1555 13.9491 7.511 13.8231 8.1545C13.6911 8.8295 13.6476 9.725 13.6371 11.009C13.6359 11.1567 13.6057 11.3028 13.548 11.4388C13.4904 11.5749 13.4065 11.6982 13.3012 11.8019C13.1959 11.9055 13.0713 11.9874 12.9343 12.0428C12.7974 12.0983 12.6508 12.1262 12.5031 12.125C12.3554 12.1238 12.2093 12.0935 12.0733 12.0359C11.9372 11.9783 11.8139 11.8944 11.7103 11.7891C11.6066 11.6838 11.5247 11.5591 11.4693 11.4222C11.4139 11.2853 11.3859 11.1387 11.3871 10.991C11.3976 9.7145 11.4381 8.6255 11.6151 7.721C11.7981 6.7865 12.1416 5.972 12.8106 5.303C13.6056 4.5095 14.5971 4.1765 15.7431 4.022C16.8396 3.875 18.2286 3.875 19.9281 3.875Z"
                  fill="url(#paint0_linear_8836_6913)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7559 16.625C11.0597 16.625 10.392 16.9016 9.8997 17.3938C9.40742 17.8861 9.13086 18.5538 9.13086 19.25C9.13086 19.9462 9.40742 20.6139 9.8997 21.1062C10.392 21.5984 11.0597 21.875 11.7559 21.875C12.4521 21.875 13.1197 21.5984 13.612 21.1062C14.1043 20.6139 14.3809 19.9462 14.3809 19.25C14.3809 18.5538 14.1043 17.8861 13.612 17.3938C13.1197 16.9016 12.4521 16.625 11.7559 16.625ZM6.88086 19.25C6.88086 17.9571 7.39447 16.7171 8.30871 15.8029C9.22295 14.8886 10.4629 14.375 11.7559 14.375C13.0488 14.375 14.2888 14.8886 15.203 15.8029C16.1172 16.7171 16.6309 17.9571 16.6309 19.25C16.6309 20.5429 16.1172 21.7829 15.203 22.6971C14.2888 23.6114 13.0488 24.125 11.7559 24.125C10.4629 24.125 9.22295 23.6114 8.30871 22.6971C7.39447 21.7829 6.88086 20.5429 6.88086 19.25ZM17.3809 11C17.3809 10.7016 17.4994 10.4155 17.7104 10.2045C17.9213 9.99353 18.2075 9.875 18.5059 9.875H27.5059C27.8042 9.875 28.0904 9.99353 28.3014 10.2045C28.5123 10.4155 28.6309 10.7016 28.6309 11C28.6309 11.2984 28.5123 11.5845 28.3014 11.7955C28.0904 12.0065 27.8042 12.125 27.5059 12.125H18.5059C18.2075 12.125 17.9213 12.0065 17.7104 11.7955C17.4994 11.5845 17.3809 11.2984 17.3809 11ZM21.8809 17C21.8809 16.7016 21.9994 16.4155 22.2104 16.2045C22.4213 15.9935 22.7075 15.875 23.0059 15.875H27.5059C27.8042 15.875 28.0904 15.9935 28.3014 16.2045C28.5123 16.4155 28.6309 16.7016 28.6309 17C28.6309 17.2984 28.5123 17.5845 28.3014 17.7955C28.0904 18.0065 27.8042 18.125 27.5059 18.125H23.0059C22.7075 18.125 22.4213 18.0065 22.2104 17.7955C21.9994 17.5845 21.8809 17.2984 21.8809 17Z"
                  fill="url(#paint1_linear_8836_6913)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_8836_6913"
                    x1="42.0703"
                    y1="18.5602"
                    x2="-1.93426"
                    y2="20.9481"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#504999" />
                    <stop offset="1" stop-color="#44A199" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_8836_6913"
                    x1="33.6468"
                    y1="17.0293"
                    x2="4.0497"
                    y2="19.2527"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#504999" />
                    <stop offset="1" stop-color="#44A199" />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="30"
                viewBox="0 0 38 30"
                fill="none"
              >
                <path
                  d="M2.54673 21.2211L0.265479 6.39363C0.0967289 5.29863 1.34423 4.55113 2.23048 5.21613L9.33798 10.5461C9.52273 10.6845 9.73374 10.7838 9.95814 10.838C10.1825 10.8921 10.4156 10.8999 10.6431 10.8609C10.8707 10.822 11.0879 10.7371 11.2815 10.6114C11.4751 10.4857 11.641 10.3219 11.7692 10.1299L17.6867 1.25488C18.3117 0.317383 19.6892 0.317383 20.3142 1.25488L26.2317 10.1299C26.3599 10.3219 26.5259 10.4857 26.7195 10.6114C26.9131 10.7371 27.1303 10.822 27.3578 10.8609C27.5853 10.8999 27.8184 10.8921 28.0428 10.838C28.2672 10.7838 28.4782 10.6845 28.663 10.5461L35.7705 5.21613C36.658 4.55113 37.9042 5.29863 37.7355 6.39363L35.4542 21.2211H2.54673ZM33.738 29.4486H4.26298C4.0376 29.4486 3.81442 29.4042 3.6062 29.318C3.39797 29.2317 3.20878 29.1053 3.04941 28.946C2.72755 28.6241 2.54673 28.1876 2.54673 27.7324V23.9636H35.4542V27.7324C35.4542 28.6799 34.6855 29.4486 33.738 29.4486Z"
                  fill="#FFB743"
                />
              </svg>
            </div>

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-4 mb-2.5 font-medium font-read">
              Coaching call booking
            </p>
            <p className="ext-[#4B5563] font-read">
              Talk to a real coach who’s here to help you grow.
            </p>

            <div className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-[100px] py-[10px] px-4 my-2 flex gap-4 items-center w-fit">
              <Link className="text-sm md:text-base lg:text-lg font-medium text-white">
                Try for free
              </Link>
              <button className="bg-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3.375 14.6309L14.625 3.38086M14.625 3.38086V11.2559M14.625 3.38086H6.75"
                    stroke="url(#paint0_linear_8836_6925)"
                    stroke-width="1.6875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8836_6925"
                      x1="17.2195"
                      y1="9.02901"
                      x2="1.86142"
                      y2="9.78488"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#504999" />
                      <stop offset="1" stop-color="#44A199" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* upgrade cards part-2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-8 my-8">
          {/* card-1 */}
          <div className="bg-white py-[34px] px-[28px] rounded-[36px] col-span-1">
            <svg
              className="bg-[#DCDBEB] rounded-full p-5 size-20"
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
            >
              <path
                d="M18.4246 9.5L14.8816 26.1283C14.5997 27.4516 14.7549 27.947 15.7267 28.8972L19.6568 32.7401C20.1749 33.2467 20.434 33.5 20.7559 33.5C21.0778 33.5 21.3368 33.2467 21.8549 32.7401L25.7851 28.8972C26.7569 27.947 26.912 27.4516 26.6302 26.1283L23.0872 9.5"
                stroke="url(#paint0_linear_8836_6932)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.341 5.18605C16.2399 4.40021 16.1894 4.0073 16.4198 3.75365C16.6503 3.5 17.0579 3.5 17.873 3.5H23.6387C24.4538 3.5 24.8613 3.5 25.0919 3.75365C25.3223 4.0073 25.2717 4.40021 25.1706 5.18605L25.0944 5.77896C24.8805 7.44077 24.7737 8.27167 24.2394 8.81074C24.1526 8.89832 24.0585 8.97893 23.9583 9.05175C23.3415 9.5 22.4796 9.5 20.7558 9.5C19.032 9.5 18.1701 9.5 17.5533 9.05175C17.4531 8.97893 17.3591 8.89832 17.2722 8.81074C16.7379 8.27167 16.6311 7.44077 16.4172 5.77895L16.341 5.18605Z"
                stroke="url(#paint1_linear_8836_6932)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5059 23C14.5942 24.0387 13.8223 24.5 13.2559 24.5C12.5293 24.5 11.2213 22.6691 10.6407 21.3431C10.3683 20.7209 10.2322 20.4098 10.2592 20.0162C10.2863 19.6226 10.4647 19.3347 10.8215 18.759C12.8391 15.5036 16.2776 12.5317 18.5059 9.5"
                stroke="url(#paint2_linear_8836_6932)"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_8836_6932"
                  x1="29.5233"
                  y1="21.5494"
                  x2="13.1116"
                  y2="21.9532"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_8836_6932"
                  x1="27.3314"
                  y1="6.51235"
                  x2="15.082"
                  y2="7.41665"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_8836_6932"
                  x1="20.4085"
                  y1="17.0309"
                  x2="9.12688"
                  y2="17.3362"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
              </defs>
            </svg>

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-4 mb-2.5 font-medium font-read">
              Set a Career Goal
            </p>
            <p className="ext-[#4B5563] font-read">
              Pick a goal that gets you excited about what’s next.
            </p>

            <div className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-[100px] py-[10px] px-4 my-2 flex gap-4 items-center w-fit">
              <p className="text-sm md:text-base lg:text-lg font-medium text-white">
                Try for free
              </p>
              <button className="bg-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3.375 14.6309L14.625 3.38086M14.625 3.38086V11.2559M14.625 3.38086H6.75"
                    stroke="url(#paint0_linear_8836_6925)"
                    stroke-width="1.6875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8836_6925"
                      x1="17.2195"
                      y1="9.02901"
                      x2="1.86142"
                      y2="9.78488"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#504999" />
                      <stop offset="1" stop-color="#44A199" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* card 2 */}
          <div className="bg-white py-[34px] px-[28px] rounded-[36px] col-span-1">
            <svg
              className="bg-[#DCDBEB] rounded-full p-5 size-20"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
            >
              <g clip-path="url(#clip0_8836_6947)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.7693 34.4797H6.24211C4.9076 34.4797 3.83203 33.4041 3.83203 32.0696V2.92961C3.83203 1.5951 4.9076 0.519531 6.24211 0.519531H28.7693C30.0839 0.519531 31.1595 1.5951 31.1595 2.92961V32.0696C31.1595 33.4041 30.0839 34.4797 28.7693 34.4797ZM6.24211 1.31625C5.3458 1.31625 4.62875 2.0333 4.62875 2.92961V32.0696C4.62875 32.9659 5.3458 33.683 6.24211 33.683H28.7693C29.6457 33.683 30.3628 32.9659 30.3628 32.0696V2.92961C30.3628 2.0333 29.6457 1.31625 28.7693 1.31625H6.24211Z"
                  fill="url(#paint0_linear_8836_6947)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2373 14.4024C9.48863 14.4024 7.25781 12.1715 7.25781 9.42286C7.25781 6.67417 9.48863 4.44336 12.2373 4.44336C14.986 4.44336 17.2168 6.67417 17.2168 9.42286C17.2168 12.1715 14.986 14.4024 12.2373 14.4024ZM12.2373 5.24008C9.92682 5.24008 8.05453 7.11237 8.05453 9.42286C8.05453 11.7333 9.92682 13.6056 12.2373 13.6056C14.5478 13.6056 16.4201 11.7333 16.4201 9.42286C16.4201 7.11237 14.5478 5.24008 12.2373 5.24008Z"
                  fill="url(#paint1_linear_8836_6947)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.43299 12.3707C8.07447 12.3707 7.89521 11.9524 8.13422 11.6935C10.2455 9.40294 14.2291 9.40294 16.3404 11.6935C16.699 12.072 16.1213 12.6097 15.7628 12.2313C13.9702 10.2793 10.5045 10.2993 8.71184 12.2313C8.65209 12.311 8.53258 12.3707 8.43299 12.3707Z"
                  fill="url(#paint2_linear_8836_6947)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2371 9.44303C11.2213 9.44303 10.3847 8.60647 10.3847 7.59065C10.3847 6.55492 11.2213 5.73828 12.2371 5.73828C13.2729 5.73828 14.1094 6.55492 14.1094 7.59065C14.1094 8.60647 13.2729 9.44303 12.2371 9.44303ZM12.2371 6.535C10.8429 6.535 10.8429 8.64631 12.2371 8.64631C13.6314 8.64631 13.6314 6.535 12.2371 6.535ZM27.3349 17.3704H7.65598C7.13811 17.3704 7.13811 16.5737 7.65598 16.5737H27.3349C27.8727 16.5737 27.8727 17.3704 27.3349 17.3704ZM27.3349 21.7523H7.65598C7.13811 21.7523 7.13811 20.9755 7.65598 20.9755H27.3349C27.8727 20.9755 27.8727 21.7523 27.3349 21.7523ZM27.3349 26.1542H7.65598C7.13811 26.1542 7.13811 25.3575 7.65598 25.3575H27.3349C27.8727 25.3575 27.8727 26.1542 27.3349 26.1542ZM17.6548 30.5561H7.65598C7.13811 30.5561 7.13811 29.7594 7.65598 29.7594H17.6548C18.1727 29.7594 18.1727 30.5561 17.6548 30.5561ZM26.837 8.58655H19.1287C18.6109 8.58655 18.6109 7.78983 19.1287 7.78983H26.837C27.3549 7.78983 27.3549 8.58655 26.837 8.58655ZM26.837 12.9685H19.1287C18.6109 12.9685 18.6109 12.1718 19.1287 12.1718H26.837C27.3549 12.1718 27.3549 12.9685 26.837 12.9685Z"
                  fill="url(#paint3_linear_8836_6947)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_8836_6947"
                  x1="37.4618"
                  y1="17.5695"
                  x2="0.123578"
                  y2="19.0482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_8836_6947"
                  x1="19.5135"
                  y1="9.44335"
                  x2="5.91792"
                  y2="10.1125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_8836_6947"
                  x1="18.3971"
                  y1="11.1781"
                  x2="7.19946"
                  y2="13.1173"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_8836_6947"
                  x1="32.4592"
                  y1="18.1982"
                  x2="4.49184"
                  y2="19.3336"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <clipPath id="clip0_8836_6947">
                  <rect
                    width="34"
                    height="34"
                    fill="white"
                    transform="translate(0.505859 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-4 mb-2.5 font-medium font-read">
              Built Resume
            </p>
            <p className="ext-[#4B5563] font-read">
              Turn your experience into opportunity.
            </p>

            <div className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-[100px] py-[10px] px-4 my-2 flex gap-4 items-center w-fit">
              <p className="text-sm md:text-base lg:text-lg font-medium text-white">
                Try for free
              </p>
              <button className="bg-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3.375 14.6309L14.625 3.38086M14.625 3.38086V11.2559M14.625 3.38086H6.75"
                    stroke="url(#paint0_linear_8836_6925)"
                    stroke-width="1.6875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8836_6925"
                      x1="17.2195"
                      y1="9.02901"
                      x2="1.86142"
                      y2="9.78488"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#504999" />
                      <stop offset="1" stop-color="#44A199" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* card-3 */}
          <div className="bg-white py-[34px] px-[28px] rounded-[36px] col-span-1">
            <svg
              className="bg-[#DCDBEB] rounded-full p-5 size-20"
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
            >
              <g clip-path="url(#clip0_8836_6964)">
                <path
                  d="M32.7888 15.8618V13.7129C32.7888 12.3013 31.6404 11.153 30.2288 11.153H29.9455V10.3986C29.9455 9.85979 29.7294 9.36591 29.3207 8.96998L27.4586 7.10783V2.25781C27.4586 1.44359 26.7962 0.78125 25.982 0.78125H8.54297C7.72882 0.78125 7.06641 1.44366 7.06641 2.25781V11.1528H6.78284C5.37131 11.1528 4.2229 12.3012 4.2229 13.7128V18.7784C3.30694 19.1687 2.66309 20.0779 2.66309 21.1347V33.6587C2.66309 35.0703 3.8115 36.2187 5.22309 36.2187H31.7886C33.2002 36.2187 34.3486 35.0703 34.3486 33.6587V18.2181C34.3486 17.1612 33.7048 16.252 32.7888 15.8617L32.7888 15.8618ZM30.2288 12.1373C31.0976 12.1373 31.8045 12.8441 31.8045 13.7128V15.6585C31.7991 15.6585 31.7939 15.6581 31.7886 15.6581H29.9454V12.1372H30.2288L30.2288 12.1373ZM24.9053 5.94662L27.2668 8.30813H24.9053V5.94662ZM23.5826 4.6239C23.8007 4.85059 23.9209 5.14738 23.9209 5.45998V8.80032C23.9209 8.93086 23.9728 9.05605 24.0651 9.14835C24.1574 9.24065 24.2826 9.29251 24.4131 9.29251H27.7535C28.0661 9.29251 28.3629 9.41274 28.5896 9.63085L28.6276 9.66889L28.6339 9.67501C28.854 9.88749 28.961 10.1242 28.9611 10.3986V15.6582H24.8855C23.9462 15.6582 23.1381 16.1247 22.6685 16.9382L21.7236 18.5749H10.5375V4.74463C10.5376 4.61412 10.5895 4.48901 10.6818 4.39673C10.7741 4.30445 10.8992 4.25253 11.0297 4.25237H22.8149C23.0891 4.25237 23.3259 4.35945 23.5384 4.57967L23.5445 4.58579L23.5826 4.6239ZM8.54297 1.76562H25.9819C26.2534 1.76562 26.4742 1.98641 26.4742 2.25781V6.12338L24.2435 3.89272C23.8475 3.48399 23.3535 3.26799 22.8149 3.26799H11.0297C10.2155 3.26799 9.55308 3.93034 9.55308 4.74455V18.5747H8.05071V2.25781C8.05071 1.98641 8.27163 1.76562 8.54297 1.76562ZM5.20727 13.7128C5.20727 12.8441 5.91413 12.1373 6.78284 12.1373H7.06641V18.5749H5.22316C5.21782 18.5749 5.21262 18.5752 5.20727 18.5753V13.7129V13.7128ZM33.3642 33.6587C33.3642 34.5275 32.6573 35.2344 31.7886 35.2344H5.22309C4.35431 35.2344 3.64746 34.5275 3.64746 33.6587V31.6241L6.77841 28.7324L8.75166 33.2603C8.79169 33.3526 8.85915 33.4305 8.94491 33.4832C9.03066 33.5359 9.13056 33.561 9.23105 33.555C9.3315 33.5493 9.42778 33.5129 9.5069 33.4507C9.58603 33.3885 9.64421 33.3036 9.67359 33.2074L12.5724 23.7147L14.5315 33.3113C14.5535 33.4189 14.6108 33.5161 14.6944 33.5874C14.778 33.6587 14.8831 33.6999 14.9929 33.7046C15.1026 33.7092 15.2108 33.677 15.3002 33.6131C15.3895 33.5492 15.4549 33.4572 15.4859 33.3518L17.0028 28.1982L18.9415 28.6637C19.0058 28.6792 19.0726 28.6815 19.1378 28.6706C19.2031 28.6596 19.2654 28.6356 19.3212 28.6001C19.3769 28.5645 19.425 28.518 19.4624 28.4634C19.4998 28.4089 19.5258 28.3473 19.5389 28.2825L20.5913 23.0693L21.8547 25.9801C21.8866 26.0538 21.936 26.1185 21.9987 26.1686C22.0614 26.2188 22.1353 26.2528 22.2142 26.2678C22.293 26.2828 22.3743 26.2783 22.451 26.2547C22.5277 26.231 22.5975 26.189 22.6542 26.1322L28.16 20.6264L28.085 21.0725C28.0639 21.2009 28.0945 21.3326 28.1703 21.4385C28.246 21.5445 28.3606 21.6161 28.489 21.6377C28.6174 21.6593 28.7492 21.6291 28.8554 21.5538C28.9616 21.4784 29.0337 21.3641 29.0557 21.2357L29.3862 19.271C29.3992 19.1937 29.3935 19.1143 29.3696 19.0396C29.3457 18.9648 29.3043 18.8969 29.2489 18.8414C29.1934 18.7858 29.1255 18.7444 29.0507 18.7205C28.976 18.6966 28.8966 18.691 28.8192 18.704L26.8546 19.0346C26.7263 19.0567 26.6119 19.1287 26.5366 19.2349C26.4612 19.3411 26.4311 19.4729 26.4527 19.6013C26.4742 19.7297 26.5459 19.8443 26.6518 19.9201C26.7577 19.9958 26.8894 20.0264 27.0179 20.0053L27.4641 19.9303L22.4697 24.9247L20.8705 21.2399C20.8288 21.1438 20.7575 21.0635 20.667 21.0108C20.5765 20.958 20.4716 20.9355 20.3674 20.9465C20.2632 20.9575 20.1653 21.0014 20.0878 21.0719C20.0103 21.1424 19.9574 21.2358 19.9366 21.3384L18.6751 27.5874L16.7779 27.1318C16.6552 27.1024 16.5258 27.1212 16.4165 27.1844C16.3072 27.2476 16.2264 27.3504 16.1908 27.4715L15.1004 31.1759L13.1496 21.6205C13.1277 21.5132 13.0707 21.4164 12.9876 21.3452C12.9045 21.274 12.8001 21.2325 12.6908 21.2273C12.5814 21.2219 12.4734 21.2532 12.3839 21.3163C12.2944 21.3793 12.2286 21.4704 12.1968 21.5752L9.12171 31.6451L7.4044 27.7046C7.37305 27.6326 7.32492 27.5691 7.26404 27.5195C7.20315 27.4699 7.13128 27.4356 7.05442 27.4195C6.97757 27.4033 6.89796 27.4058 6.82226 27.4267C6.74656 27.4476 6.67696 27.4864 6.61929 27.5397L3.6476 30.2842V21.1349C3.6476 20.2661 4.35445 19.5593 5.22323 19.5593H22.0078C22.0942 19.5593 22.1791 19.5365 22.2539 19.4933C22.3287 19.4501 22.3909 19.388 22.434 19.3132L23.5211 17.4303C23.8144 16.9223 24.2989 16.6426 24.8856 16.6426H31.7887C32.6575 16.6426 33.3643 17.3493 33.3643 18.2182V33.6588L33.3642 33.6587ZM30.7345 29.453H25.7769C25.2635 29.453 24.8458 29.8707 24.8458 30.3841V32.6047C24.8458 33.1181 25.2635 33.5358 25.7769 33.5358H30.7345C31.248 33.5358 31.6657 33.1182 31.6657 32.6047V30.3841C31.6657 29.8707 31.248 29.453 30.7345 29.453ZM30.6813 32.5515H25.8302V30.4374H30.6813V32.5515ZM21.1225 15.4479C21.1225 15.5784 21.0707 15.7036 20.9783 15.7959C20.886 15.8882 20.7609 15.9401 20.6303 15.9401H13.4584C13.3279 15.9401 13.2027 15.8882 13.1104 15.7959C13.0181 15.7036 12.9663 15.5784 12.9663 15.4479C12.9663 15.3173 13.0181 15.1921 13.1104 15.0998C13.2027 15.0075 13.3279 14.9557 13.4584 14.9557H20.6303C20.7609 14.9557 20.886 15.0075 20.9783 15.0998C21.0707 15.1921 21.1225 15.3173 21.1225 15.4479ZM12.9663 10.069C12.9663 9.93843 13.0181 9.81324 13.1104 9.72094C13.2027 9.62864 13.3279 9.57678 13.4584 9.57678H20.6303C20.7609 9.57678 20.886 9.62864 20.9783 9.72094C21.0707 9.81324 21.1225 9.93843 21.1225 10.069C21.1225 10.1995 21.0707 10.3247 20.9783 10.417C20.886 10.5093 20.7609 10.5612 20.6303 10.5612H13.4584C13.3279 10.5612 13.2027 10.5093 13.1104 10.417C13.0181 10.3247 12.9663 10.1995 12.9663 10.069ZM13.4584 12.2662H26.1147C26.2452 12.2662 26.3704 12.3181 26.4627 12.4104C26.555 12.5027 26.6069 12.6279 26.6069 12.7584C26.6069 12.889 26.555 13.0141 26.4627 13.1065C26.3704 13.1988 26.2452 13.2506 26.1147 13.2506H13.4584C13.3279 13.2506 13.2027 13.1988 13.1104 13.1065C13.0181 13.0141 12.9663 12.889 12.9663 12.7584C12.9663 12.6279 13.0181 12.5027 13.1104 12.4104C13.2027 12.3181 13.3279 12.2662 13.4584 12.2662ZM12.9663 7.37952C12.9663 7.24898 13.0181 7.12379 13.1104 7.03149C13.2027 6.93918 13.3279 6.88733 13.4584 6.88733H20.6303C20.7609 6.88733 20.886 6.93918 20.9783 7.03149C21.0707 7.12379 21.1225 7.24898 21.1225 7.37952C21.1225 7.51005 21.0707 7.63524 20.9783 7.72754C20.886 7.81985 20.7609 7.8717 20.6303 7.8717H13.4584C13.3279 7.8717 13.2027 7.81985 13.1104 7.72754C13.0181 7.63524 12.9663 7.51005 12.9663 7.37952Z"
                  fill="url(#paint0_linear_8836_6964)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_8836_6964"
                  x1="41.6559"
                  y1="18.5729"
                  x2="-1.62087"
                  y2="20.4773"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <clipPath id="clip0_8836_6964">
                  <rect
                    width="36"
                    height="36"
                    fill="white"
                    transform="translate(0.505859 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-4 mb-2.5 font-medium font-read">
              Write a Cover Letter
            </p>
            <p className="ext-[#4B5563] font-read">
              Write a cover letter that highlights your passion.
            </p>

            <div className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-[100px] py-[10px] px-4 my-2 flex gap-4 items-center w-fit">
              <p className="text-sm md:text-base lg:text-lg font-medium text-white">
                Try for free
              </p>
              <button className="bg-white rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M3.375 14.6309L14.625 3.38086M14.625 3.38086V11.2559M14.625 3.38086H6.75"
                    stroke="url(#paint0_linear_8836_6925)"
                    stroke-width="1.6875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_8836_6925"
                      x1="17.2195"
                      y1="9.02901"
                      x2="1.86142"
                      y2="9.78488"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#504999" />
                      <stop offset="1" stop-color="#44A199" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="my-3 grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-8">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-medium text-[#191919] mb-3">
              This Week’s Tasks
            </h3>
            <p className="text-[#717171] text-base md:text-lg lg:text-xl xl:text-2xl">
              Let’s take the next step.
            </p>
          </div>

          <div className="col-span-1 mt-10">
            <h3 className="text-[#191919] text-2xl md:text-3xl lg:text-4xl xl:text-[40px] mt-5">
              Task Status
            </h3>
          </div>
        </div>

        <div className="my-3 grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-8">
          {/* stepper but functionality stillhave to implement */}
          <div className="col-span-1 lg:col-span-2 max-h-[400px] overflow-y-scroll">
            <Stepper></Stepper>
          </div>

          {/* progress circle  */}
          <div className="col-span-1 mb-4">
            {/* <h3 className="text-[#191919] text-2xl md:text-3xl lg:text-4xl xl:text-[40px] mt-5">Task Status</h3> */}
            <div className="w-full h-full flex items-center justify-center font-read shadow-lg my-4 rounded-[36px] p-[46px] bg-white">
              <div>
                <CircularProgress
                  value={completedPercentage}
                  size={144}
                  strokeWidth={14}
                  showLabel
                  labelClassName="text-xl font-bold"
                  renderLabel={(val) => `${val}%`}
                  style={{ color: "#3BB515" }}
                />
                <div className="flex gap-2 items-center text-base md:text-lg xl:text-2xl font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <circle
                      cx="6.44594"
                      cy="6.74379"
                      r="5.87025"
                      fill="#3BB515"
                    />
                  </svg>
                  <span className="text-sm md:text-base xl:text-xl">
                    Complete
                  </span>
                </div>
              </div>

              <div>
                <CircularProgress
                  value={inProgressPercentage}
                  size={144}
                  strokeWidth={14}
                  showLabel
                  labelClassName="text-xl font-bold"
                  progressClassName={cn("stroke-secondary")}
                  renderLabel={(val) => `${val}%`}
                />
                <div className="flex gap-2 items-center font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                  >
                    <circle
                      cx="6.50167"
                      cy="6.17111"
                      r="5.70773"
                      fill="url(#paint0_linear_8836_7043)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_8836_7043"
                        x1="14.842"
                        y1="6.1946"
                        x2="-0.741896"
                        y2="6.96159"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#504999" />
                        <stop offset="1" stopColor="#44A199" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-sm md:text-base xl:text-xl">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
