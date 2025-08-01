import React, { useState, useEffect, useRef } from 'react';

const ProfessionalFireAnimation = () => {
  const canvasRef = useRef(null);
  const [flameIntensity, setFlameIntensity] = useState(1);
  const particles = useRef([]);

  // Realistic flame flickering physics
  useEffect(() => {
    let lastTime = 0;
    const flicker = (time) => {
      if (!lastTime || time - lastTime > 50 + Math.random() * 100) {
        setFlameIntensity(0.7 + Math.random() * 0.6);
        lastTime = time;
      }
      requestAnimationFrame(flicker);
    };
    requestAnimationFrame(flicker);
    return () => cancelAnimationFrame(flicker);
  }, []);

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize particles with realistic distribution
    particles.current = Array.from({ length: 60 }, () => ({
      x: canvas.width * (0.3 + Math.random() * 0.4),
      y: canvas.height,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      life: Math.random() * 100 + 50,
      sway: Math.random() * 0.1 - 0.05,
      heat: Math.random()
    }));

    const animate = () => {
      // Clear with subtle fade for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        // Physics-based movement
        p.y -= p.speed;
        p.x += p.sway;
        p.life--;
        p.heat = Math.min(1, p.y / canvas.height * 2);
        
        // Draw with heat-based coloring
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0, 
          p.x, p.y, p.size
        );
        gradient.addColorStop(0, `rgba(255, ${150 + p.heat * 105}, ${50 + p.heat * 50}, ${0.7})`);
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle dead particles
        if (p.life <= 0 || p.y < 0) {
          Object.assign(p, {
            x: canvas.width * (0.3 + Math.random() * 0.4),
            y: canvas.height + 10,
            life: Math.random() * 100 + 50,
            heat: Math.random()
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-96 w-72">
      {/* Core flame with organic shape */}
      <div 
        className="absolute bottom-20 w-24 h-80 origin-bottom"
        style={{
          transform: `scaleY(${flameIntensity}) rotate(${(flameIntensity - 0.9) * 2}deg)`,
          transition: 'transform 0.08s cubic-bezier(0.33, 0, 0.67, 1)'
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,100,0,0.8) 0%, rgba(255,200,0,0.6) 70%, transparent 100%)',
            clipPath: `
              polygon(
                0% 100%,
                20% 70%,
                30% 40%,
                40% 20%,
                50% 0%,
                60% 20%,
                70% 40%,
                80% 70%,
                100% 100%
              )`,
            maskImage: 'linear-gradient(to top, transparent 10%, white 40%)'
          }}
        />
      </div>

      {/* Heat distortion layer */}
      <div
        className="absolute bottom-16 w-32 h-12 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,100,0,0.5) 0%, transparent 70%)',
          filter: 'blur(15px)',
          transform: `scaleX(${1 + (flameIntensity - 1) * 0.2})`,
          opacity: flameIntensity * 0.8
        }}
      />

      {/* Particle system canvas */}
      <canvas
        ref={canvasRef}
        width={288}
        height={384}
        className="absolute w-full h-full pointer-events-none"
      />

      {/* Bright core highlight */}
      <div
        className="absolute bottom-32 w-8 h-40"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,200,0.3) 0%, rgba(255,255,255,0.1) 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default ProfessionalFireAnimation;