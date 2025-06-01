import React from 'react';
import { CountdownTimer } from './CountdownTimer';
// import { ThemeToggle } from './ThemeToggle';
import { AnimatedBackground } from './AnimatedBackground';

const ComingSoon = () => {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  
  // const [theme, setTheme] = useState('light');
  // 
  // const toggleTheme = () => {
  //   setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  // };

  // {
  //     theme === 'light' 
  //       ? 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900' 
  //       : 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50'
  //   }
  
  return (
    <div className={`relative py-20 md:py-24 lg:py-28 xl:py-32 w-full flex flex-col items-center justify-center transition-colors duration-500 ease-in-out $`}>
      <AnimatedBackground  />
      
      {/* <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div> */}
      
      <div className="container mx-auto px-4 py-8 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#44A199] to-[#504999]">
                Coming Soon
              </span>
            </h1>
            
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#44A199] to-[#504999] rounded-full mb-8"></div>
            
            <h2 className="text-xl md:text-2xl font-medium mb-4 opacity-90">
              We're crafting something amazing for you
            </h2>
            
            <p className={`text-base md:text-lg max-w-xl mx-auto mb-12`}>
              Our team is working hard to bring you a revolutionary experience. 
              Stay tuned for our launch.
            </p>
            
            <CountdownTimer launchDate={launchDate}  />
          </div>
        </div>
      </div>
      
      <footer className={`absolute bottom-4 text-sm`}>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;