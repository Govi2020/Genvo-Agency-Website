import AnimatedTextLines from "../components/AnimatedTextLines";
import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planets";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Suspense, useEffect, useState } from "react";

function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const aboutText = `I build stunning, high-performance websites 
   with 3D, animations, and top-tier SEO crafted to rank fast, 
   look premium, and convert with convieniece`;

  return (
    <section
      id="home"
      className="flex flex-col justify-end overflow-x-hidden min-h-screen"
      aria-labelledby="hero-title"
    >
        <AnimatedHeaderSection
          subTitle={"Website Solutions Agency"}
          title={"Genvo"}
          text={aboutText}
          textColor={"black"}
          withScrollTrigger={false}
          animationLoadTime={1000}
          isHero
        />

        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "98vw", height: "100vh" }}
          aria-hidden="true"
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
            aria-label="3D animated planet visualization"
          >
            <Float speed={prefersReducedMotion ? 0 : 2.5}>
              <Planet scale={isMobile ? 0.7 : 1} />
            </Float>
            <ambientLight intensity={0.5}></ambientLight>
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  scale={10}
                  position={[0, 5, -9]}
                ></Lightformer>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  scale={10}
                  position={[0, 3, 1]}
                ></Lightformer>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  scale={10}
                  position={[-5, -1, -1]}
                ></Lightformer>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  scale={16}
                  position={[10, 1, 0]}
                ></Lightformer>
              </group>
            </Environment>
          </Canvas>
        </figure>
    </section>
  );
}

export default Hero;
