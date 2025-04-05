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
    </div>
  );
};

export default Home;
