import { useState, useEffect } from 'react';

const FireAnimatedCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [fireIntensity, setFireIntensity] = useState(1);

  useEffect(() => {
    const flameInterval = setInterval(() => {
      setFireIntensity(Math.floor(Math.random() * 3) + 1); // Random flame intensity (1-3)
    }, 300);

    return () => clearInterval(flameInterval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* 🔥 FIRE EFFECT 🔥 */}
      <div className="relative">
        {/* Base Card */}
        <div 
          className={`relative w-72 h-96 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-2xl 
            transition-all duration-300 ease-out
            ${isHovered ? 'scale-105 -rotate-1' : 'scale-100 rotate-0'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* FLAMES (Animated with Tailwind) */}
          <div className="absolute -top-4 left-0 right-0 flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-6 h-12 bg-gradient-to-t from-yellow-300 to-red-600 rounded-b-full 
                  animate-[flicker_0.3s_ease-in-out_infinite] 
                  ${fireIntensity === 1 ? 'h-8' : fireIntensity === 2 ? 'h-12' : 'h-16'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Card Content */}
          <div className="p-6 text-white">
            <h2 className={`text-3xl font-bold mb-3 transition-all duration-500 
              ${isHovered ? 'translate-y-2 text-yellow-300' : 'translate-y-0'}`}>
              LIT CARD 🔥
            </h2>
            <p className={`text-sm opacity-90 transition-all duration-700
              ${isHovered ? 'opacity-100 scale-105' : 'opacity-90'}`}>
              This component is FIRE! Hover for more heat.
            </p>
          </div>

          {/* Glowing Ember Effect */}
          <div className={`absolute bottom-4 left-4 w-3 h-3 rounded-full bg-yellow-400 
            animate-[pulse_1.5s_ease-in-out_infinite] ${isHovered ? 'opacity-100' : 'opacity-70'}`}></div>
        </div>

        {/* Floating Embers */}
        {isHovered && (
          <>
            <div className="absolute top-10 left-8 w-2 h-2 rounded-full bg-orange-400 animate-[float_4s_linear_infinite]"></div>
            <div className="absolute top-20 right-10 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-[float_3s_linear_infinite]"></div>
            <div className="absolute bottom-20 left-12 w-1 h-1 rounded-full bg-red-500 animate-[float_5s_linear_infinite]"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default FireAnimatedCard;