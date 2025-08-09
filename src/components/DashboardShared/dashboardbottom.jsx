import { Link } from "react-router";

const DashboardBottomBtn = () => {
  return (
    <>
      <Link to="/dashboard/billing">
        <div className="w-[200px] xl:w-[220px] relative mt-auto hidden md:block">
          <div className="bg-gradient-to-r from-primary to-secondary border-1 border-[#504999] rounded-[37px]">
            <p className="text-[#F6F8FE] font-medium text-xs text-center mt-20">
              You are now in Free Trial
            </p>
            <div className="bg-white rounded-[100px] py-[10px] px-5 m-[10px] flex justify-center items-center">
              <button className="text-transparent bg-gradient-to-r from-primary via-secondary to-secondary bg-clip-text text-sm font-medium">
                Upgraded to Pro
              </button>
            </div>
          </div>

          <div className="absolute top-0 right-1/2 transform -translate-y-13 translate-x-1/2">
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              width="110"
              height="110"
              viewBox="0 0 110 110"
              fill="none"
            >
              <g clip-path="url(#clip0_8836_7017)">
                <g filter="url(#filter0_d_8836_7017)">
                  <path
                    d="M62.8375 105H47.1625L40.8547 92.2852L35.533 90.1784L21.653 94.9136L10.5669 84.3312L15.5276 71.0819L13.3203 66.0023L0 59.9813V45.0187L13.3203 38.9977L15.5274 33.9179L10.5667 20.6688L21.653 10.0866L35.5405 14.8249L40.8515 12.7245L47.1625 0H62.8375L69.1485 12.7245L74.4595 14.8249L88.347 10.0866L99.4331 20.6688L94.4724 33.9181L96.6797 38.9977L110 45.0185V59.981L96.6797 66.0021L94.4726 71.0819L99.4333 84.331L88.347 94.9132L74.4668 90.178L69.1453 92.2852L62.8375 105Z"
                    fill="url(#paint0_linear_8836_7017)"
                  />
                  <path
                    d="M68.7507 72.1871H41.2507V49.2183H26.9023L55.0007 17.9287L83.099 49.2183H68.7507V72.1871Z"
                    fill="#F6F8FE"
                  />
                  <path
                    d="M61.875 78.75H68.75V85.3125H61.875V78.75ZM41.25 78.75H48.125V85.3125H41.25V78.75Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_8836_7017"
                  x="-4"
                  y="0"
                  width="118"
                  height="113"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.980769 0 0 0 0 0.980769 0 0 0 0 0.980769 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_8836_7017"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_8836_7017"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_8836_7017"
                  x1="135.368"
                  y1="52.716"
                  x2="-14.7641"
                  y2="60.4569"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <clipPath id="clip0_8836_7017">
                  <rect width="110" height="110" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DashboardBottomBtn;
