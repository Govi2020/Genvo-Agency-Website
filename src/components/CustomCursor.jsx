import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Don't add cursor effects if user prefers reduced motion
    if (prefersReducedMotion) return;

    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const click = () => {
        gsap.timeline().to(cursorRef.current, {
        scale: .7,
        duration: 0.1,
        ease: "power2.out",
      }).to(cursorRef.current, {
        scale: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });

      gsap.timeline().to(followerRef.current, {
        scale: 1.1,
        opacity: 0.4,
        duration: 0.1,
        ease: "power2.out",
      }).to(followerRef.current, {
        scale: 1,
        opacity: 0.8,
        duration: 0.1,
        ease: "power2.inOut",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    window.addEventListener("mouseup", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      window.removeEventListener("mouseup", click);
    };
  }, [prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    gsap.to(cursorRef.current, {
      backgroundColor: "white",
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });
  }, [prefersReducedMotion]);

  // Don't render cursor if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={followerRef}
        className="fixed md:block hidden top-0 left-0 w-14 h-14 border border-yellow-50 bg-white/30 backdrop-blur rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998]"
        aria-hidden="true"
      ></div>
      <div
        ref={cursorRef}
        className="fixed md:block hidden top-0 left-0 w-2.5 h-2.5 bg-black rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999]"
        aria-hidden="true"
      ></div>
    </>
  );
};

export default CustomCursor;
