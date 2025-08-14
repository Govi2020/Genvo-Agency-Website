import { useRef } from "react";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AnimatedHeaderSection({subTitle,title,text,textColor, withScrollTrigger=false}) {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: withScrollTrigger ? {
            trigger: contextRef.current
        } : false
      })
      .from(contextRef.current, {
        y: "50vh",
        duration: 1,
        ease: "circ.out",
      })
      .from(
        headerRef.current,
        {
          y: 100,
          duration: 1,
          ease: "circ.out",
        },
        "<+0.2"
      );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
          ref={headerRef}
        >
          <p className={`text-sm font-light tracking-[0.5rem] uppercase px-10 text-${textColor}`}>
            {subTitle}
          </p>

          <div className="px-10">
            <h1 className={`flex flex-col flex-wrap gap-12 text-${textColor} uppercase banner-text-responsive sm:gap-16 md:block md:mb-4`}>
                {title} 
            </h1>
          </div>
        </div>
      </div>

      <div className={`relative px-10 text-${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 text-end sm:py-16">
          <AnimatedTextLines
            className="font-light uppercase value-text-responsive"
            text={text}
          />
        </div>
      </div>
    </div>
  );
}
