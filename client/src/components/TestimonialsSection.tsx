import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection: React.FC = () => {
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
  );
};

export default TestimonialsSection;
