import { useRef } from "react";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

export default function AnimatedHeaderSection({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
  animationLoadTime = 0,
  isHero = false,
}) {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const { loaded, total } = useProgress();

  useGSAP(() => {
    if (loaded != total && isHero) {
      return false;
    }
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: withScrollTrigger
          ? { trigger: contextRef.current }
          : false,
      });

      tl.fromTo(
        contextRef.current,
        { y: "50vh", opacity: 1 },
        { y: 0, opacity: 1, duration: 1, ease: "circ.out" }
      ).fromTo(
        headerRef.current,
        { y: 100, opacity: 1 },
        { y: 0, opacity: 1, duration: 1, ease: "circ.out" },
        "<+0.2" // start 0.2s after the previous starts
      );
    }, animationLoadTime);
  }, [loaded]);

  return (
    <div ref={contextRef} style={{ opacity: 0 }}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
          ref={headerRef}
          style={{opacity: 0}}
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 text-${textColor}`}
          >
            {subTitle}
          </p>

          <div className="px-10">
            <h1
              className={`flex flex-col flex-wrap gap-12 text-${textColor} uppercase banner-text-responsive sm:gap-16 md:block md:mb-4`}
            >
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
            hasLoaded={loaded == total}
            animationLoadTime={animationLoadTime}
          />
        </div>
      </div>
    </div>
  );
}
