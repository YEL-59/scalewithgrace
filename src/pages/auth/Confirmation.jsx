import { Link, useNavigate } from "react-router";

function Confirmation() {
    const navigate = useNavigate();
    const handleSignIn = () =>{
        navigate('sign-in');
    }
    return (
        <div className="font-poppins max-h-screen w-11/12 lg:w-3/4 xl:w-1/2 mx-auto">
            <div className="mx-auto my-4 md:my-5 lg:my-6 xl:my-[30px]">
                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
                    <path d="M120.5 62.8125C120.5 67.0078 119.492 70.8984 117.477 74.4609C115.461 78.0234 112.766 80.8125 109.367 82.7578C109.461 83.3906 109.508 84.375 109.508 85.7109C109.508 92.0625 107.375 97.4531 103.156 101.906C98.9141 106.383 93.8047 108.609 87.8281 108.609C85.1562 108.609 82.6016 108.117 80.1875 107.133C78.3125 110.977 75.6172 114.07 72.0781 116.438C68.5625 118.828 64.6953 120 60.5 120C56.2109 120 52.3203 118.852 48.8516 116.508C45.3594 114.188 42.6875 111.07 40.8125 107.133C38.3984 108.117 35.8672 108.609 33.1719 108.609C27.1953 108.609 22.0625 106.383 17.7734 101.906C13.4844 97.4531 11.3516 92.0391 11.3516 85.7109C11.3516 85.0078 11.4453 84.0234 11.6094 82.7578C8.21094 80.7891 5.51562 78.0234 3.5 74.4609C1.50781 70.8984 0.5 67.0078 0.5 62.8125C0.5 58.3594 1.625 54.2578 3.85156 50.5547C6.07812 46.8516 9.07812 44.1094 12.8281 42.3281C11.8438 39.6562 11.3516 36.9609 11.3516 34.2891C11.3516 27.9609 13.4844 22.5469 17.7734 18.0938C22.0625 13.6406 27.1953 11.3906 33.1719 11.3906C35.8438 11.3906 38.3984 11.8828 40.8125 12.8672C42.6875 9.02344 45.3828 5.92969 48.9219 3.5625C52.4375 1.19531 56.3047 0 60.5 0C64.6953 0 68.5625 1.19531 72.0781 3.53906C75.5938 5.90625 78.3125 9 80.1875 12.8438C82.6016 11.8594 85.1328 11.3672 87.8281 11.3672C93.8047 11.3672 98.9141 13.5938 103.156 18.0703C107.398 22.5469 109.508 27.9375 109.508 34.2656C109.508 37.2188 109.062 39.8906 108.172 42.3047C111.922 44.0859 114.922 46.8281 117.148 50.5312C119.375 54.2578 120.5 58.3594 120.5 62.8125ZM57.9453 80.8828L82.7188 43.7812C83.3516 42.7969 83.5391 41.7188 83.3281 40.5703C83.0938 39.4219 82.5078 38.5078 81.5234 37.8984C80.5391 37.2656 79.4609 37.0547 78.3125 37.2188C77.1406 37.4062 76.2031 37.9688 75.5 38.9531L53.6797 71.7656L43.625 61.7344C42.7344 60.8438 41.7031 60.4219 40.5547 60.4688C39.3828 60.5156 38.375 60.9375 37.4844 61.7344C36.6875 62.5312 36.2891 63.5391 36.2891 64.7578C36.2891 65.9531 36.6875 66.9609 37.4844 67.7812L51.2891 81.5859L51.9688 82.125C52.7656 82.6641 53.5859 82.9219 54.3828 82.9219C55.9531 82.8984 57.1484 82.2422 57.9453 80.8828Z" fill="url(#paint0_linear_8457_15350)" />
                    <defs>
                        <linearGradient id="paint0_linear_8457_15350" x1="148.174" y1="60.2469" x2="-15.6449" y2="68.3096" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#504999" />
                            <stop offset="1" stop-color="#44A199" />
                        </linearGradient>
                    </defs>
                </svg>
                <h2 className="text-2xl md:text-3xl lg:[text-4xl] xl:text-5xl text-[#1E1E1E] leading-12 md:leading-14 lg:leading-16  xl:leading-[72px] text-center font-bold mt-5 md:mt-6 lg:mt-8  xl:mt-10">
                  Well Done Your Password Change Successfully
                </h2>
                <p className="text-[#4E504F] text-xs md:text-sm lg:text-base xl:text-lg text-center mt-3 lg:mt-4">
                  Always remember the password for account <br></br> at Tabor study.
                </p>

                <button onClick={handleSignIn} className="bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-4 text-white text-base lg:text-lg mt-6 mb-4">
                    <Link to='/confirmation/sign-in'> <input type="submit" value="Go Back To Sign In" /></Link>
                </button>
            </div>
        </div>
    )
}

export default Confirmation;