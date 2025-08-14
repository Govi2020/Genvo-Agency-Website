import React, { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function About() {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  const aboutText = `Code isn’t just code. It’s craft.

I build stunning, scalable apps that are fast, secure, and unforgettable — powered by clean architecture, high-performance stacks, and a love for the details.

When I’m not building, I’m teaching, climbing, or open-sourcing my latest ideas.`;
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    gsap.set(imageRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imageRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 3,
      ease: "power4.out",
      scrollTrigger: { trigger: imageRef.current },
    });
  });




  return (
    <section id="about" className="min-h-screen bg-black rounded-b-rxl">
      <AnimatedHeaderSection
        subTitle={"Code with Purose , Build to Scale"}
        title={"About"}
        text={text}
        textColor={"white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imageRef}
          className="w-md rounded-3xl"
          src="images/me.jpg"
          alt=""
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
}
