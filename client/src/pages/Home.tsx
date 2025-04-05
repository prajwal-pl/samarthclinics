import React, { useEffect, useState } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import { isAuthenticated } from "@/lib/handler";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import QuickInfoSection from "@/components/QuickInfoSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Home: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const checkAuth = async () => {
    const isAuth = await isAuthenticated();
    setAuthenticated(isAuth ?? false);
  };

  return (
    <div>
      {/* Header */}
      <TopBar />

      {/* Hero Section */}
      <HeroSection authenticated={authenticated} />

      {/* Quick Info Section */}
      <QuickInfoSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Map Section */}
      <Map />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Sticky Widget */}
      <a
        href="https://wa.me/+917004119766?text=नमस्कार डॉक्टर साहब, हमको आपके पास इलाज करवाना है!"
        className="whatsapp-widget"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#25D366",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
          zIndex: 1000,
          transition: "all 0.3s ease",
          animation: "pulse 2s infinite",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.25)";
        }}
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "28px" }} />
        <style>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
          }
        `}</style>
      </a>
    </div>
  );
};

export default Home;
