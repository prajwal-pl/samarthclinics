import { useState } from "react";
import { MapPin } from "lucide-react";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="map-section">
      <div className="map-container">
        {isLoading && <div className="loading-indicator">Loading map...</div>}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.825675144675!2d85.1406895!3d25.6125392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4d8ce94d30763c1b!2sSamarth%20Clinic!5e0!3m2!1sen!2sin!4v1700992427448!5m2!1sen!2sin"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location of Samarth Clinic"
          width="100%"
          height="450"
          onLoad={() => setIsLoading(false)}
        ></iframe>
        <div className="map-overlay">
          <a
            href="https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7"
            target="_blank"
            rel="noreferrer"
            className="location-button"
            aria-label="Get directions to Samarth Clinic"
          >
            <MapPin size={24} fill="pink" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Map;
