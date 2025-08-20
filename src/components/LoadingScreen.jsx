import { useRef, useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import Logo from "./Logo";

export default function LoadingScreen() {
  const { progress, loaded, total } = useProgress();
  const isLoaded = loaded === total;
  const overlayRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const paths = logoRef.current.querySelectorAll("path");

    paths.forEach((path) => {
      const length = path.getTotalLength();
      if (path.classList.contains("circle")) {
        return;
      }
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap
        .timeline()
        .to(path, {
          strokeDashoffset: 0,
          fill: "black",
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.2,
        })
        .to(path, {
          fill: "white",
          duration: 0.5,
        });
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Animate out with GSAP
      gsap.to(overlayRef.current, {
        duration: 1.5,
        opacity: 0.95,
        scale: 1,
        yPercent: -100,
        ease: "power3.inOut",
        onComplete: () => setHidden(true),
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${Math.floor(progress)}%`,
        duration: 0.5, // smoothness speed
        ease: "power2.out", // easing for smooth effect
      });
    }
  }, [progress]); // animate whenever progress changes

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-99 flex flex-col items-center justify-center bg-black text-white"
    >
      <Logo ref={logoRef} />
      <div class="w-[500px] h-1 bg-[#1a1a1a]">
        <div
          class="h-full rounded bg-gradient-to-r from-[white] via-[wheat] to-[#dfb15d]"
          ref={barRef}
        ></div>
      </div>

      <style></style>

      <p className="mt-6 text-lg font-medium">{Math.floor(progress)}%</p>
    </div>
  );
}
