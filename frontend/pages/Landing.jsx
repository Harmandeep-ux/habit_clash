// Landing.jsx
import React from 'react';
import BlurText from '../Animation/BlurText';
import TextCursor from '../Animation/TextCursor';

const Landing = () => {
  const handleAnimationComplete = () => {
    console.log('Main heading animation completed!');
  };

  return (
    <div className='relative bg-yellow-500 h-screen flex justify-center items-center overflow-hidden'>
      {/* Main content - reduced z-index */}
      <div className='w-full z-0'>  {/* Changed from z-10 to z-0 */}
        <BlurText
          text="Clash Habits. Build Streaks. Win Together."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-8xl font-bold text-center px-8 text-white drop-shadow-lg"  // Added white text
        />
      </div>

      {/* TextCursor - increased z-index and added debug border */}
      <TextCursor
  text="🔥" 
   className="text-5xl text-orange-600" 
  delay={0.2}
  spacing={200}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={20}
  maxPoints={10}
/>
    </div>
  );
};

export default Landing;