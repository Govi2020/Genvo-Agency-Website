import React, { useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects as project, projects } from "../constents";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Works() {
  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const previewRef = useRef(null);
  const overlayRef = useRef([]);
  const projectRef = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });

  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(projectRef.current, {
      y: 100,
      opacity: 0,
      delay: .6,
      duration: .7,
      stagger: .1,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project-list"
      }
    })

  });

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRef.current[index];

    gsap.killTweensOf(el);

    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%,100% 100%,0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0,100% 100%,0 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });

    const el = overlayRef.current[index];

    gsap.killTweensOf(el);

    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%,100% 100%,0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });
  };

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
        id="project-list"
      >
        {project.map((project, index) => {
          return (
            <a
              key={project.id}
              ref={(el) => projectRef.current[index] = el}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              href={project.link}
              id="project"
              className="relative flex cursor-pointer flex-col gap-1 py-5 group md:gap-0"
            >
              {/* Overlay */}
              <div
                ref={(el) => (overlayRef.current[index] = el)}
                className="absolute inset-0 hidden duration-200 bg-black -z-10 clip-path md:block"
              />

              {/* Title */}
              <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
                <h2 className="lg:text-[32px] text-[26px]">{project.name}</h2>
                <Icon
                  icon="lucide:arrow-up-right"
                  className="md:size-6 size-5"
                />
              </div>
              {/* Divider */}
              <div className="w-full h-0.5 bg-black/80" />

              {/* Framework */}
              <div className="flex flex-wrap px-10 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                {project.frameworks.map((framework) => {
                  return (
                    <p
                      key={framework.id}
                      className="text-black transition-colors duration-500 md:group-hover:text-white"
                    >
                      {framework.name}
                    </p>
                  );
                })}
              </div>

              {/* Mobile Preview Image */}
              <div className="relative flex overflow-hidden items-center jusitfy-center px-10 md:hidden h-[400px]">
                <img
                  src={project.bgImage}
                  alt={`${project.name}-bg-image`}
                  className="object-cover w-full h-full rounded-md brightness-50"
                />
                <img
                  src={project.image}
                  alt={`${project.name}-bg-image`}
                  className="bg-center absolute inset-0 top-20 sm:px-14 rounded-xl"
                />
              </div>
            </a>
          );
        })}

        {/* Desktop Floating Preview */}
        <div
          ref={previewRef}
          className="fixed -top-0 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
