import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

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

  return (
    <div>
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
            <div className="space-x-2">
              <li style={{ padding: "10px 0" }}>
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Dashboard
                </button>
              </li>
              <li style={{ padding: "10px 0" }}>
                <SignOutButton />
              </li>
            </div>
          ) : (
            <div className="space-x-2">
              <li style={{ padding: "10px 0" }}>
                <a
                  href="/sign-in"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Doctor Sign In
                </a>
              </li>
              <li style={{ padding: "10px 0" }}>
                <a
                  href="/sign-up"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Doctor Sign Up
                </a>
              </li>
            </div>
          )}
        </ul>
      </div>

      <header className="site-navbar" role="banner">
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
                      {/* <li className="has-children">
                        <a href="#">ड्रॉपडाउन</a>
                        <ul className="dropdown"></ul>
                      </li> */}
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
                  {isSignedIn ? (
                    <>
                      <li className="px-4" style={{ padding: "10px 0" }}>
                        <button
                          onClick={() => {
                            window.location.href = "/dashboard";
                          }}
                        >
                          Dashboard
                        </button>
                      </li>
                      <li style={{ padding: "10px 0" }}>
                        <SignOutButton />
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="px-1 text-white"
                        style={{ padding: "10px 0" }}
                      >
                        <Button
                          onClick={() => {
                            window.location.href = "/sign-in";
                          }}
                          variant={"outline"}
                          style={{ color: "#000", textDecoration: "none" }}
                        >
                          Doctor Sign In
                        </Button>
                      </li>
                      {/* <li style={{ padding: "10px 0" }}>
                        <a
                          href="/sign-up"
                          style={{ color: "#fff", textDecoration: "none" }}
                        >
                          Doctor Sign Up
                        </a>
                      </li> */}
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopBar;
