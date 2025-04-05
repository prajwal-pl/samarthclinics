import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface HeroSectionProps {
  authenticated: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ authenticated }) => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    // Initialize Typed.js
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: [
          "सालों पुराने दर्द",
          "सालों पुराने तनाव",
          "सालों पुराने थकान",
          "लाइलाज बिमारी",
        ],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 4000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
      });
    }

    // Cleanup
    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <div
      className="site-blocks-cover overlay"
      style={{ backgroundImage: "url(/images/hero_bg_11.webp)" }}
      data-aos="fade"
    >
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-10">
            <div className="row justify-content-center mb-4">
              <div className="col-md-10 text-center">
                <h1 data-aos="fade-up" className="mb-5">
                  हम समाधान देते हैं आपके{" "}
                  <span className="text-pink-400" ref={typedRef}></span>
                </h1>
                <div className="d-flex justify-content-center flex-wrap">
                  <a
                    href={`${authenticated ? "/appointments" : "/form"}`}
                    className="btn btn-primary btn-pill mr-3 mb-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    खूद अपॉइंटमेंट बुक करें
                  </a>
                  <a
                    href="upi://pay?pa=akkiathletic@ybl"
                    className="btn btn-success btn-pill mr-3 mb-3"
                  >
                    भुगतान करें
                  </a>
                  <a
                    href="https://wa.me/+917004119766?text=नमस्कार डॉक्टर साहब, हमको आपके पास इलाज करवाना है!"
                    className="btn btn-secondary btn-pill mb-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      style={{ fontSize: "24px", color: "green" }}
                    />{" "}
                    वॉट्सएप पर बात करें
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
