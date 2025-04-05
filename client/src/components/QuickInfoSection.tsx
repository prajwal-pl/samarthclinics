import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const QuickInfoSection: React.FC = () => {
  // Define styles for better visual appeal
  const styles = {
    section: {
      padding: "2rem 0",
      backgroundColor: "#f8f9fa",
      borderBottom: "1px solid #eaeaea",
    },
    container: {
      boxShadow: "0 0 15px rgba(0,0,0,0.05)",
      borderRadius: "8px",
      padding: "1.5rem",
      backgroundColor: "#fff",
    },
    iconContainer: {
      backgroundColor: "#e6f7ff",
      minWidth: "50px", // Changed from width to minWidth
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#1890ff",
      fontSize: "1.2rem",
      transition: "all 0.3s ease",
      flexShrink: 0, // Prevent shrinking on larger screens
    },
    infoBox: {
      padding: "0.8rem",
      borderRadius: "6px",
      transition: "transform 0.3s ease",
      cursor: "default",
    },
    heading: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "0.4rem",
    },
    excerpt: {
      color: "#666",
      fontSize: "0.95rem",
    },
    link: {
      color: "#1890ff",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
  };

  return (
    <div className="block-quick-info-2" style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="block-quick-info-2-inner">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    हमारा स्थान
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    सुनील बोस के पास, कैनाल रोड - डेहरी 821307
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    आज हमें कॉल करें
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    <a
                      href="tel:+917004119766"
                      style={styles.link}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "#1890ff")
                      }
                    >
                      +917004119766
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    हमें संदेश भेजें
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    <a
                      href="mailto:Samarthclinic.info@gmail.com"
                      style={styles.link}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#0056b3")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "#1890ff")
                      }
                    >
                      Samarthclinic.info@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div
                className="d-flex quick-info-2"
                style={styles.infoBox}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <span className="icon mr-3" style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <div className="text">
                  <strong className="d-block heading" style={styles.heading}>
                    खुलने का समय
                  </strong>
                  <span className="excerpt" style={styles.excerpt}>
                    सोम-शनि 10:00 AM - 06:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInfoSection;
