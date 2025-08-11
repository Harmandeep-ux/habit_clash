import React from "react";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaRocket, 
  FaStar,
  FaRegSmileBeam,
  FaRegLaughBeam
} from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const Success = () => {
  return (
    <LuxuryContainer>
      {/* Animated background elements */}
      <FloatingOrbs>
        <PinkOrb />
        <BlueOrb />
        <PurpleOrb />
      </FloatingOrbs>

      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main content */}
        <CheckmarkWrapper>
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <FaCheckCircle className="check-icon" />
          </motion.div>
        </CheckmarkWrapper>

        <Title>Check-In Complete!</Title>
        <Subtitle>You're officially checked in for today</Subtitle>

        <CelebrationArea>
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaRegLaughBeam className="celebration-icon" />
          </motion.div>
        </CelebrationArea>

        <DetailsBox>
          <DetailItem>
            <FaCalendarAlt className="icon" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </DetailItem>
          <DetailItem>
            <FaRocket className="icon" />
          </DetailItem>
        </DetailsBox>

        <EncouragementText>
          Keep up the amazing work! Your consistency is inspiring.
        </EncouragementText>

        {/* Particles */}
        <Particles>
          {[...Array(20)].map((_, i) => (
            <Particle
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </Particles>

        {/* Shining stars */}
        {[...Array(5)].map((_, i) => (
          <ShiningStar
            key={`star-${i}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <FaStar />
          </ShiningStar>
        ))}
      </GlassCard>
    </LuxuryContainer>
  );
};

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.2; transform: scale(0.8); }
`;

const particleFloat = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
`;

// Styled components
const LuxuryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 50px 40px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  overflow: hidden;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
`;

const PinkOrb = styled(Orb)`
  width: 300px;
  height: 300px;
  background: #ff6b9d;
  top: 20%;
  left: 10%;
  animation: ${float} 12s ease-in-out infinite;
`;

const BlueOrb = styled(Orb)`
  width: 400px;
  height: 400px;
  background: #6b9dff;
  bottom: 10%;
  right: 10%;
  animation: ${float} 15s ease-in-out infinite reverse;
`;

const PurpleOrb = styled(Orb)`
  width: 250px;
  height: 250px;
  background: #9d6bff;
  top: 50%;
  right: 20%;
  animation: ${float} 18s ease-in-out infinite;
`;

const CheckmarkWrapper = styled.div`
  margin-bottom: 25px;
  
  .check-icon {
    font-size: 90px;
    color: #4aff8f;
    filter: drop-shadow(0 0 10px rgba(74, 255, 143, 0.5));
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  font-weight: 300;
`;

const CelebrationArea = styled.div`
  margin: 30px 0;
  
  .celebration-icon {
    font-size: 60px;
    color: #ffd166;
    filter: drop-shadow(0 0 8px rgba(255, 209, 102, 0.6));
  }
`;

const DetailsBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  margin: 30px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: white;
  font-size: 1rem;
  margin: 10px 0;
  
  .icon {
    color: #4aff8f;
    font-size: 1.2rem;
  }
`;

const EncouragementText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  margin-top: 20px;
`;

const Particles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: ${particleFloat} 10s linear infinite;
`;

const ShiningStar = styled.div`
  position: absolute;
  color: #fff;
  font-size: ${() => Math.random() * 10 + 10}px;
  animation: ${shine} ${() => Math.random() * 3 + 2}s ease-in-out infinite;
  opacity: 0;
`;

export default Success;