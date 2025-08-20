import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function AnimatedTextLines({ text, className, hasLoaded, animationLoadTime }) {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  const lines = text?.split("\n").filter((line) => {
    return line.trim() !== "";
  });

  useGSAP(() => {
    if (!hasLoaded) {
      return;
    }
    if (lineRefs.current.length > 0) {
      setTimeout(() => {
        gsap.from(lineRefs.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out",
          scrollTrigger: {
            trigger: containerRef.current,
          },
        });
      }, animationLoadTime);
    }
  }, [hasLoaded]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
}

export default AnimatedTextLines;
