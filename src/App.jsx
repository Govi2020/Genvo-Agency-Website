import { useEffect, useState, useRef} from "react";
import NavBar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import { ReactLenis, useLenis } from "lenis/react";
import Services from "./sections/Services";
import About from "./sections/About";
import Works from "./sections/Works";
import gsap from "gsap";
import CustomCursor from "./components/CustomCursor";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <ReactLenis root>
      {" "}
      <LoadingScreen/>
      <CustomCursor />
      <NavBar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <ContactSummary />
      <Contact />
    </ReactLenis>
  );
}

export default App;
