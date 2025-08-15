import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

function ServiceSummary() {
    const isMobile = useMediaQuery({maxWidth: "480px"})


    useGSAP(() => {
        gsap.to("#title-service-1", {
            xPercent: isMobile ? 50 : 20,
            scrollTrigger: {
                target: "#title-service-1",
                scrub: true
            }
        })
        gsap.to("#title-service-2", {
            xPercent: isMobile ? -300 : -30,
            scrollTrigger: {
                target: "#title-service-2",
                scrub: true
            }
        })
        gsap.to("#title-service-3", {
            xPercent: isMobile ? 200 : 100,
            scrollTrigger: {
                target: "#title-service-3",
                scrub: true
            }
        })
        gsap.to("#title-service-4", {
            xPercent: isMobile ? -300 : -100,
            scrollTrigger: {
                target: "#title-service-4",
                scrub: true
            }
        })
    })

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
      <div id="title-service-1">
        <p>Website</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 md:translate-x-16 translate-x-30"
      >
        <p className="font-normal">Development</p>
        <div className="w-10 h-1 bg-gold md:w-32" />
        <p>Deployment</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 md:-translate-x-48 -translate-x-20"
      >
        <p>SEO</p>
        <div className="w-10 h-1 bg-gold md:w-32" />
        <p>SEM</p>
        <div className="w-10 h-1 bg-gold md:w-32" />
        <p>Ranking</p>
        <p></p>
      </div>
      <div id="title-service-4" className="translate-x-48">
        <p>Web Performance</p>
      </div>
    </section>
  );
}

export default ServiceSummary;
