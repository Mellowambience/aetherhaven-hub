"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
  color: string;
  type: "dot" | "sigil-frag";
  angle: number;
  angleSpeed: number;
}

const COLORS = ["#B8C8FF", "#7C6AF7", "#F2A65A", "#C9956A", "#E8E0FF"];
const PARTICLE_COUNT = 60;

export default function VoidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  function createParticle(width: number, height: number): Particle {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      opacityDelta: (Math.random() - 0.5) * 0.008,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: Math.random() > 0.85 ? "sigil-frag" : "dot",
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.01,
    };
  }

  function drawSigilFrag(
    ctx: CanvasRenderingContext2D,
    p: Particle
  ) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity * 0.6;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    // Small triangle fragment
    const s = p.radius * 4;
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.866, s * 0.5);
    ctx.lineTo(-s * 0.866, s * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // Init particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDelta;
        p.angle += p.angleSpeed;

        // Bounds wrap
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Opacity bounce
        if (p.opacity < 0.05 || p.opacity > 0.65) p.opacityDelta *= -1;

        // Draw
        if (p.type === "sigil-frag") {
          drawSigilFrag(ctx, p);
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="void-canvas" aria-hidden="true" />;
}