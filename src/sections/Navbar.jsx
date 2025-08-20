import { useEffect, useRef, useState } from "react";
import { socials } from "../constents";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

function NavBar() {
  const navRef = useRef(null);
  const contactRef = useRef(null);
  const linksRef = useRef([]);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const menuButtonRef = useRef(null);

  const tl = useRef(null);
  const Icontl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [showBurger, setShowBurger] = useState(false);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], { autoAlpha: 0, x: -20 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    Icontl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    setIsTop(document.getElementsByTagName("html").scrollTop < 40);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY < 30 || currentScrollY <= lastScrollY);
      setIsTop(currentScrollY < 40);

      lastScrollY = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      Icontl.current.reverse();
    } else {
      tl.current.play();
      Icontl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu();
      menuButtonRef.current?.focus();
    }
  };

  const handleMenuKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/50 py-28 gap-y-10 md:w-1/2 md:left-1/2"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-5xl lg:text-6xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  to={`${section}`}
                  offset={0}
                  duration={2000}
                  smooth
                  className="transition-all cursor-pointer duration-300 hover:text-white w-full block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={`Navigate to ${section} section`}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
          ref={contactRef}
        >
          <div className="font-light">
            <p className="tracking-wide text-white/50" id="email-label">Email</p>
            <a
              href="mailto:Govi18051969@gmail.com"
              className="text-xl tracking-widest lowercase text-pretty hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-labelledby="email-label"
            >
              Govi18051969@gmail.com
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50" id="social-label">Social Media</p>
            <div 
              className="flex flex-col flex-wrap gap-x-2 md:flex-row"
              role="list"
              aria-labelledby="social-label"
            >
              {socials.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    role="listitem"
                    aria-label={`Visit ${social.name} profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Menu toggle button */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        onKeyDown={handleMenuKeyDown}
        style={
          showBurger || isOpen
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
        className="fixed top-4 right-10 z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-haspopup="true"
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
          aria-hidden="true"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
          aria-hidden="true"
        ></span>
      </button>
      
      {/* Logo */}
      <img
        style={
          ((!isOpen && isTop))
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
        src="images/Genvo-Logo.png"
        alt="Gevano Logo - Web & SEO Agency"
        className="fixed top-4 bg-transparent left-10 z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 rounded-full cursor-pointer w-[140px] h-[140px]"
      />
    </>
  );
}

export default NavBar;
