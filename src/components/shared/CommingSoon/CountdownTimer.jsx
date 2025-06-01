import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ launchDate, theme }) => {
  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  const timerUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {timerUnits.map((unit) => (
        <div 
          key={unit.label} 
          className={`flex flex-col items-center justify-center p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary to-secondary`}
        >
          <div className={`text-3xl md:text-4xl font-bold text-white`}>
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className={`text-xs uppercase tracking-wider mt-1 ${
            theme === 'light' ? 'text-slate-500' : 'text-slate-200'
          }`}>
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};