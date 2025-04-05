import React from "react";
import { motion } from "framer-motion";

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h2 className="section-title">हमारी सेवाएं</h2>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle">
              हम क्या प्रदान करते हैं: फिजियोथेरेपी, पुनर्वास, और संरेखण सेवाएं
            </p>
          </div>
        </div>

        <div className="row g-4">
          <ServiceCard
            imageUrl="images/img_11.jpg"
            title="फिजियोथेरेपी"
            description="व्यापक फिजियोथेरेपी सेवाएं: दर्द राहत, पुनर्वास, और स्वास्थ्य, आपके उत्कृष्ट स्वास्थ्य और गतिशीलता के लिए अनुकूलित।"
            delay={0.1}
          />
          <ServiceCard
            imageUrl="images/img_22.jpg"
            title="पुनर्वास"
            description="पुनर्वास उत्कृष्टता: रीढ़ की हड्डी को संरेखित करना, दर्द को दूर करना, और एक स्वस्थ, सक्रिय जीवन के लिए समग्र कल्याण को बढ़ावा देना।"
            delay={0.2}
          />
          <ServiceCard
            imageUrl="images/chiro.jpg"
            title="चिरोप्रैक्टिक"
            description="चिरोप्रैक्टिक विशेषज्ञता: रीढ़ की हड्डी को संरेखित करना, दर्द को दूर करना, और समग्र कल्याण को बढ़ाना, एक स्वस्थ और सक्रिय जीवन के लिए।"
            delay={0.3}
          />
          <ServiceCard
            imageUrl="images/kinesio.webp"
            title="किनेसियो टेपिंग"
            description="किनेसियो टेपिंग नवाचार: आंदोलन को समर्थन देना, असुविधा को कम करना, और समग्र कल्याण को बढ़ावा देना, एक स्वस्थ और सक्रिय जीवन के लिए।"
            delay={0.4}
          />
          <ServiceCard
            imageUrl="images/img_555.jpg"
            title="कपिंग थेरेपी"
            description="कपिंग थेरेपी के साथ कल्याण को बढ़ाएं: रक्त परिसंचरण को बढ़ावा दें, दर्द को कम करें, और गहरी राहत और पुनरुत्थान का अनुभव करें।"
            delay={0.5}
          />
          <ServiceCard
            imageUrl="images/dryneedling.jpg"
            title="ड्राई नीडलिंग"
            description="ड्राई नीडलिंग: दर्द राहत और समग्र कल्याण के लिए मांसपेशी गांठों को सटीकता से लक्षित करना।"
            delay={0.6}
          />
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center">
            <motion.a
              href="#"
              className="btn btn-primary btn-lg rounded-pill px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              सभी सेवाएं देखें{" "}
              <i className="ms-2 icon-keyboard_arrow_right"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  imageUrl: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      className="col-sm-6 col-md-6 col-lg-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="service-card h-100">
        <div className="service-card-image">
          <img src={imageUrl} alt={title} className="img-fluid rounded" />
          <div className="service-card-overlay">
            <motion.a
              href="#"
              className="btn btn-light btn-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              और जानें
            </motion.a>
          </div>
        </div>
        <div className="service-card-body">
          <h3 className="service-card-title">{title}</h3>
          <p className="service-card-text">{description}</p>
          <motion.a
            href="#"
            className="service-card-link"
            whileHover={{ x: 5 }}
          >
            और जानें <i className="icon-keyboard_arrow_right"></i>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
