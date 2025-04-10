import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold display-5 text-primary">Our Team</h2>
          <div className="divider mx-auto my-4"></div>
          <p className="lead mb-4">
            Our qualified medical professionals are dedicated to providing the
            highest quality care
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={8} lg={6} xl={4} data-aos="zoom-in" data-aos-delay="100">
            <div className="card team-card h-100 border-0 shadow-sm">
              <div className="text-center p-4">
                <div
                  className="team-image-container mb-4 mx-auto position-relative"
                  style={{ maxWidth: "250px" }}
                >
                  <img
                    src="/images/doctor.png"
                    alt="Team Member"
                    width={250}
                    height={250}
                    className="img-fluid rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="h4 fw-bold mb-2">Dr. Prem Prakash</h3>
                <p className="text-muted mb-3">Senior Physiotherapist</p>
                <p className="small text-muted">
                  With over 15 years of experience, Dr. Prem Prakash specializes
                  in rehabilitation therapy, pediatrition, orthopedic
                  physiotherapy, neurological physiotherapy and sports injury
                  treatment.
                </p>
              </div>
            </div>
          </Col>

          {/* You can add more team members in the same format if needed */}
        </Row>
      </Container>

      <style>{`
        .divider {
          height: 4px;
          width: 70px;
          background-color: var(--bs-primary);
        }
        .team-card {
          transition: transform 0.3s ease-in-out;
          border-radius: 10px;
          overflow: hidden;
        }
        .team-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
