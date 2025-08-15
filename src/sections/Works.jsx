import React, { useEffect, useState } from "react";
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
  const previewImgRef = useRef(null);
  const [isBadConnection, setIsBadConnection] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection || "4g";
    if (connection) {
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        setIsBadConnection(true);
      }
    }
  }, []);

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
      delay: 0.6,
      duration: 0.7,
      stagger: 0.1,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project-list",
      },
    });
  });

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRef.current[index];

    // Show skeleton and start loading
    setIsImageLoading(true);
    
    if (previewImgRef.current) {
      // Create new image to preload
      const img = new Image();
      img.onload = () => {
        if (previewImgRef.current) {
          previewImgRef.current.src = projects[index].image;
          setIsImageLoading(false);
        }
      };
      img.onerror = () => {
        // Handle image load error
        setIsImageLoading(false);
        console.warn(`Failed to load image for project: ${projects[index].name}`);
      };
      img.src = projects[index].image;
    }

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
      }
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

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

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
              ref={(el) => (projectRef.current[index] = el)}
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
              <div className="flex flex-wrap px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
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
              <div className="relative flex overflow-hidden items-center justify-center px-10 md:hidden h-[400px]">
                <img
                  src={project.bgImage}
                  alt={`${project.name}-bg-image`}
                  className="object-cover w-full h-full rounded-md brightness-50"
                />
                <img
                  src={!isBadConnection ? project.image : project.image.replace(".png", "-min.png").replace(".jpg", "-min.jpg").replace(".jpeg", "-min.jpeg")}
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
          {/* Skeleton Loading */}
          {isImageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#e5e5e0] via-[#f5f5f0] to-[#e0e0db]">
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              
              {/* Elegant loading element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  {/* Main geometric shape - matches the minimalist vibe */}
                  <div 
                    className="w-16 h-16 border-2 border-[#cfa355] rounded-lg"
                    style={{ animation: 'diamond-rotate 4s linear infinite' }}
                  ></div>
                  
                  {/* Inner accent with brand gold */}
                  <div 
                    className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-[#cfa355]/20 to-[#cfa355]/10 rounded"
                    style={{ animation: 'diamond-inner 3s ease-in-out infinite' }}
                  ></div>
                  
                  {/* Subtle dot indicator */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#8b8b73] rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Minimalist corner accents */}
              <div className="absolute top-4 left-4 w-1 h-1 bg-[#393632] opacity-40"></div>
              <div className="absolute top-4 right-4 w-1 h-1 bg-[#393632] opacity-40"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#393632] opacity-40"></div>
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-[#393632] opacity-40"></div>
              
              {/* Subtle line accents */}
              <div className="absolute top-1/2 left-8 w-8 h-px bg-gradient-to-r from-transparent via-[#8b8b73]/30 to-transparent"></div>
              <div className="absolute top-1/2 right-8 w-8 h-px bg-gradient-to-l from-transparent via-[#8b8b73]/30 to-transparent"></div>
            </div>
          )}
          
          <img
            ref={previewImgRef}
            src=""
            alt="preview"
            className={`object-cover w-full h-full transition-all duration-500 ${
              isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onError={() => setIsImageLoading(false)}
          />
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes diamond-rotate {
          0% { 
            transform: rotate(0deg);
            border-color: #cfa355;
          }
          25% { 
            transform: rotate(90deg);
            border-color: #f4d03f;
          }
          50% { 
            transform: rotate(180deg);
            border-color: #f39c12;
          }
          75% { 
            transform: rotate(270deg);
            border-color: #e67e22;
          }
          100% { 
            transform: rotate(360deg);
            border-color: #cfa355;
          }
        }
        
        @keyframes diamond-inner {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
            opacity: 0.1;
          }
          50% { 
            transform: rotate(180deg) scale(1.1);
            opacity: 0.3;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
