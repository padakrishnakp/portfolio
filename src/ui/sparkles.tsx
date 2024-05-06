import React, { useRef, useEffect } from "react";

interface SparklesCoreProps {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  particleColor: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = initializeParticles();
    };

    const initializeParticles = (): { x: number; y: number; vx: number; vy: number }[] => {
      const particlesArray: { x: number; y: number; vx: number; vy: number }[] = [];
      for (let i = 0; i < particleDensity; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() - 0.5,
          vy: Math.random() - 0.5, 
        });
      }
      return particlesArray;
    };
    

    const drawParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap particles around the canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        context.beginPath();
        context.arc(particle.x, particle.y, minSize + Math.random() * (maxSize - minSize), 0, Math.PI * 2);
        context.fillStyle = particleColor;
        context.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animationFrameId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      style={{ background }}
      className="absolute inset-0 w-full h-full"
    />
  );
};

