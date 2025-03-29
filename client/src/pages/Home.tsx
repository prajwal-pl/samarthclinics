import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Menu, X } from "lucide-react";
import Map from "../components/Map";
import { SignOutButton, useUser } from "@clerk/clerk-react";

// Add a custom hook for counter animation
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.ceil(end / (duration / 16)); // 16ms is approx one frame at 60fps

          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.current.observe(countRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [end, duration]);

  return { count, countRef };
};

const Home: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser(); // Add state for menu toggle

  // Initialize counters
  const customersCounter = useCounter(200);
  const yearsCounter = useCounter(2);
  const satisfactionCounter = useCounter(100);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

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

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("overflow-hidden"); // Optional: prevent body scrolling when menu is open
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        menuOpen &&
        !target.closest(".site-mobile-menu") &&
        !target.closest(".js-menu-toggle") &&
        target.classList.contains("site-wrap")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`site-wrap ${menuOpen ? "offcanvas-menu" : ""}`}>
      {/* Header */}
      <div
        style={{
          position: "fixed",
          width: "300px",
          height: "100vh",
          right: 0,
          top: 0,
          background: "#fff",
          zIndex: 9999, // Very high z-index
          padding: "20px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          boxShadow: "-5px 0 20px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching the overlay
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleMenuToggle}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            <X color="black" />
          </button>
        </div>

        {/* Menu Items */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ padding: "10px 0" }}>
            <a href="/" style={{ color: "#000", textDecoration: "none" }}>
              होम
            </a>
          </li>
          <li style={{ padding: "10px 0" }}>
            <a
              href="/services"
              style={{ color: "#000", textDecoration: "none" }}
            >
              सेवाएं
            </a>
          </li>
          <li style={{ padding: "10px 0" }}>
            <a href="/about" style={{ color: "#000", textDecoration: "none" }}>
              हमारे बारे में
            </a>
          </li>
          <li style={{ padding: "10px 0" }}>
            <a href="/blog" style={{ color: "#000", textDecoration: "none" }}>
              ब्लॉग
            </a>
          </li>
          <li style={{ padding: "10px 0" }}>
            <a
              href="/contact"
              style={{ color: "#000", textDecoration: "none" }}
            >
              संपर्क करें
            </a>
          </li>
          {isSignedIn ? (
            <li style={{ padding: "10px 0" }}>
              <SignOutButton />
            </li>
          ) : (
            <>
              <li style={{ padding: "10px 0" }}>
                <a
                  href="/sign-in"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Sign In
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a
                  href="/sign-up"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      <header className="site-navbar" role="banner">
        {/* <div
          className="site-mobile-menu"
          style={{
            ...mobileMenuStyle,
            transform: menuOpen ? "translateX(0%)" : "translateX(110%)",
            zIndex: 2100,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span
                onClick={handleMenuToggle}
                className="icon-close2 js-menu-toggle"
                style={{ cursor: "pointer" }}
              >
                <X />
              </span>
            </div>
          </div>
          <div className="site-mobile-menu-body">
            
          </div>
        </div> */}

        <div className="container">
          <div className="row align-items-center">
            <div className="col-8 col-xl-4">
              <h1 className="mb-0 site-logo">
                <a href="/" className="text-white mb-0">
                  समर्थ क्लिनिक<span className="text-primary">.</span>
                </a>
              </h1>
              <p className="text-white mb-0" style={{ fontSize: "0.7rem" }}>
                फिजियोथैरेपी रिहैबिलिटेशन सेंटर
              </p>
            </div>
            <div className="col-4 col-md-3 d-xl-none text-right">
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle text-white"
                onClick={handleMenuToggle}
              >
                <span className="icon-menu h3 pl-3">
                  <Menu className="ml-10" />
                </span>
              </a>
            </div>
            <div className="col-12 col-md-8 d-none d-xl-block">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className="active">
                    <a href="/">
                      <span>होम</span>
                    </a>
                  </li>
                  <li className="has-children">
                    <a href="/services">
                      <span>सेवाएं</span>
                    </a>
                    <ul className="dropdown arrow-top">
                      <li>
                        <a href="#">फिजिकल थेरेपी</a>
                      </li>
                      <li>
                        <a href="#">मसाज थेरेपी</a>
                      </li>
                      <li>
                        <a href="#">चिरोप्रैक्टिक थेरेपी</a>
                      </li>
                      <li className="has-children">
                        <a href="#">ड्रॉपडाउन</a>
                        <ul className="dropdown"></ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/about">
                      <span>हमारे बारे में</span>
                    </a>
                  </li>
                  <li>
                    <a href="/blog">
                      <span>ब्लॉग</span>
                    </a>
                  </li>
                  <li>
                    <a href="/contact">
                      <span>संपर्क करें</span>
                    </a>
                  </li>
                  <li>
                    <a href="/sign-in">
                      <span>Sign in</span>
                    </a>
                  </li>
                  <li>
                    <a href="/sign-up">
                      <span>Sign up</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              style={{ position: "relative", top: "3px" }}
            >
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle text-white"
              >
                <span className="icon-menu h3">
                  <Menu />
                </span>
              </a>
            </div> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
                      href="https://docs.google.com/forms/d/1Pykg91TjGn-U420oOcn8tlVYACLK66sepwleTdOSrec/edit"
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

      {/* Quick Info Section */}
      <div className="block-quick-info-2">
        <div className="container">
          <div className="block-quick-info-2-inner">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <div className="d-flex quick-info-2">
                  <span className="icon mr-3">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <div className="text">
                    <strong className="d-block heading">हमारा स्थान</strong>
                    <span className="excerpt">
                      सुनील बोस के पास, कैनाल रोड - डेहरी 821307
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <div className="d-flex quick-info-2">
                  <span className="icon mr-3">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div className="text">
                    <strong className="d-block heading">
                      आज हमें कॉल करें
                    </strong>
                    <span className="excerpt">
                      <a href="tel:+917004119766">+917004119766</a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <div className="d-flex quick-info-2">
                  <span className="icon mr-3">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <div className="text">
                    <strong className="d-block heading">
                      हमें संदेश भेजें
                    </strong>
                    <span className="excerpt">
                      <a href="mailto:Samarthclinic.info@gmail.com">
                        Samarthclinic.info@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                <div className="d-flex quick-info-2">
                  <span className="icon mr-3">
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  <div className="text">
                    <strong className="d-block heading">खुलने का समय</strong>
                    <span className="excerpt">सोम-शनि 10:00 AM - 06:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="block-services-1 py-5">
        <div className="container">
          <div className="row">
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <h3 className="mb-3">हमारी सेवाएं:</h3>
              <p>
                हम क्या प्रदान करते हैं: फिजियोथेरेपी, पुनर्वास, और संरेखण
                सेवाएं
              </p>
              <p>
                <a
                  href="#"
                  className="d-inline-flex align-items-center block-service-1-more"
                >
                  <span>सभी सेवाएं देखें</span>{" "}
                  <span className="icon-keyboard_arrow_right icon"></span>
                </a>
              </p>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_11.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">फिजियोथेरेपी</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    व्यापक फिजियोथेरेपी सेवाएं: दर्द राहत, पुनर्वास, और
                    स्वास्थ्य, आपके उत्कृष्ट स्वास्थ्य और गतिशीलता के लिए
                    अनुकूलित।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_22.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">पुनर्वास</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    पुनर्वास उत्कृष्टता: रीढ़ की हड्डी को संरेखित करना, दर्द को
                    दूर करना, और एक स्वस्थ, सक्रिय जीवन के लिए समग्र कल्याण को
                    बढ़ावा देना।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/chiro.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">चिरोप्रैक्टिक</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    चिरोप्रैक्टिक विशेषज्ञता: रीढ़ की हड्डी को संरेखित करना,
                    दर्द को दूर करना, और समग्र कल्याण को बढ़ाना, एक स्वस्थ और
                    सक्रिय जीवन के लिए।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/kinesio.webp"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">किनेसियो टेपिंग</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    किनेसियो टेपिंग नवाचार: आंदोलन को समर्थन देना, असुविधा को कम
                    करना, और समग्र कल्याण को बढ़ावा देना, एक स्वस्थ और सक्रिय
                    जीवन के लिए।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/img_555.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#" />
                  कपिंग थेरेपी
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    कपिंग थेरेपी के साथ कल्याण को बढ़ाएं: रक्त परिसंचरण को
                    बढ़ावा दें, दर्द को कम करें, और गहरी राहत और पुनरुत्थान का
                    अनुभव करें।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
            <div className="mb-4 mb-lg-0 col-sm-6 col-md-6 col-lg-3">
              <div className="block-service-1-card">
                <a href="#" className="thumbnail-link d-block mb-4">
                  <img
                    src="images/dryneedling.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h3 className="block-service-1-heading mb-3">
                  <a href="#">ड्राई नीडलिंग</a>
                </h3>
                <div className="block-service-1-excerpt">
                  <p>
                    ड्राई नीडलिंग: दर्द राहत और समग्र कल्याण के लिए मांसपेशी
                    गांठों को सटीकता से लक्षित करना।
                  </p>
                </div>
                <p>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center block-service-1-more"
                  >
                    <span>और जानें</span>{" "}
                    <span className="icon-keyboard_arrow_right icon"></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue with other sections... */}

      <div className="block-half-content-1 d-block d-lg-flex mt-5">
        <div
          className="block-half-content-img"
          style={{ backgroundImage: "url('images/hero_bg_11.webp')" }}
        ></div>
        <div className="block-half-content-text bg-primary">
          <div className="block-half-content-text-inner">
            <h2 className="block-half-content-heading mb-4">
              हमें क्यों चुनें
            </h2>
            <div className="block-half-content-excerpt">
              <p className="lead">
                हमें चुनें विशेषज्ञ फिजियोथेरेपी, चिरोप्रैक्टिक, और संरेखण
                सेवाओं के लिए, जहाँ व्यक्तिगत देखभाल, समग्र दृष्टिकोण, और
                अत्याधुनिक तकनीक आपके कल्याण और दर्द राहत को सुनिश्चित करती है।
              </p>
            </div>
          </div>

          <div className="block-counter-1 section-counter">
            <div className="row">
              <div className="col-sm-4">
                <div className="counter">
                  <div className="number-wrap">
                    <span
                      className="block-counter-1-number"
                      data-number="200"
                      ref={customersCounter.countRef}
                    >
                      {customersCounter.count}
                    </span>
                    <span className="append"></span>
                  </div>
                  <span className="block-counter-1-caption">खुश ग्राहक</span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="counter">
                  <div className="number-wrap">
                    <span
                      className="block-counter-1-number"
                      data-number="2"
                      ref={yearsCounter.countRef}
                    >
                      {yearsCounter.count}
                    </span>
                    <span className="append"></span>
                  </div>
                  <span className="block-counter-1-caption">अनुभव के वर्ष</span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="counter">
                  <div className="number-wrap">
                    <span
                      className="block-counter-1-number"
                      data-number="100"
                      ref={satisfactionCounter.countRef}
                    >
                      {satisfactionCounter.count}
                    </span>
                    <span className="append">%</span>
                  </div>
                  <span className="block-counter-1-caption">संतुष्टि</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary">
                खुश ग्राहक
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="owl-carousel-2 owl-carousel">
                <div className="d-block block-testimony mx-auto text-center">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_1.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">रितेश मिश्रा</h2>
                    <blockquote>
                      &ldquo;फास्ट रिकवरी हुआ है और हम सहमत हैं!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_2.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">सुनील कुमार</h2>
                    <blockquote>
                      &ldquo;बनारस के रिजेक्टेड यहां ठीक हुआ जा के!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_3.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">रविंदर कुशवाहा</h2>
                    <blockquote>
                      &ldquo;10 साल का कमर दर्द ठीक हुआ बिना दवाई के!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_4.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">बिनोद कुमार</h2>
                    <blockquote>
                      &ldquo;कंधे का दर्द जड़ से खत्म हो गया!&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="site-section-heading text-center font-secondary">
                खुश ग्राहक
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider {...testimonialSettings}>
                <div className="d-block block-testimony mx-auto text-center px-3">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_1.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">रितेश मिश्रा</h2>
                    <blockquote>
                      &ldquo;फास्ट रिकवरी हुआ है और हम सहमत हैं!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center px-3">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_2.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">सुनील कुमार</h2>
                    <blockquote>
                      &ldquo;बनारस के रिजेक्टेड यहां ठीक हुआ जा के!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center px-3">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_3.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">रविंदर कुशवाहा</h2>
                    <blockquote>
                      &ldquo;10 साल का कमर दर्द ठीक हुआ बिना दवाई के!&rdquo;
                    </blockquote>
                  </div>
                </div>

                <div className="d-block block-testimony mx-auto text-center px-3">
                  <div className="person w-25 mx-auto mb-4">
                    <img
                      src="images/person_4.jpg"
                      alt="Image"
                      className="img-fluid rounded-circle w-50 mx-auto"
                    />
                  </div>
                  <div>
                    <h2 className="h5 mb-4">बिनोद कुमार</h2>
                    <blockquote>
                      &ldquo;कंधे का दर्द जड़ से खत्म हो गया!&rdquo;
                    </blockquote>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-5 block-cta-1 primary-overlay"
        style={{ backgroundImage: "url('images/hero_bg_22.webp')" }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <h2 className="mb-3 mt-0 text-white">
                पहले आने वालों के लिए 30% तक की छूट
              </h2>
              <p className="mb-0 text-white lead">यूहू!</p>
            </div>
            <div className="col-lg-4">
              <p className="mb-0">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffoTrMEMzFGiZF8QtC4zgejMu7LZ-0nlj7MUa1MlK7j5p5jA/viewform?embedded=true"
                  className="btn btn-outline-white text-white btn-md btn-pill px-5 font-weight-bold btn-block"
                >
                  संपर्क करें
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Map />

      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">त्वरित लिंक</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">हमारे बारे में</a>
                    </li>
                    <li>
                      <a href="#">सेवाएं</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">उत्पाद</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">हमारे बारे में</a>
                    </li>
                    <li>
                      <a href="#">सेवाएं</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">विशेषताएं</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">हमारे बारे में</a>
                    </li>
                    <li>
                      <a href="#">सेवाएं</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">हमें अनुसरण करें</h2>
                  <a
                    href="https://www.facebook.com/imthepremkumarshah"
                    className="pl-0 pr-3"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    href="https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3"
                    className="pl-3 pr-3"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    href="https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN"
                    className="pl-3 pr-3"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <h2 className="footer-heading mb-4">न्यूज़लेटर सदस्यता</h2>
              <p>हमारी मासिक सेवाओं की सदस्यता लें</p>
              <form action="#" method="post" className="subscription">
                <div className="input-group mb-3 d-flex align-items-stretch">
                  <input
                    type="text"
                    className="form-control bg-transparent"
                    placeholder="ईमेल दर्ज करें"
                    aria-label="ईमेल दर्ज करें"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-primary text-white"
                    type="button"
                    id="button-addon2"
                  >
                    भेजें
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row pt-5 mt-5">
            <div className="col-12 text-md-center text-left">
              <p>
                कॉपीराइट &copy; {new Date().getFullYear()} सभी अधिकार सुरक्षित
                हैं।
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
