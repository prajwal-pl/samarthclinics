import { useEffect, useRef } from "react";
import Typed from "typed.js";
import AOS from "aos";
import TopBar from "@/components/TopBar";

const Blog = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Initialize Typed.js
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: ["ब्लॉग अपडेट"],
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
    <div className="site-wrap">
      <TopBar />
      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: "url(images/hero_bg_11.webp)" }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10">
              <div className="row justify-content-center mb-4">
                <div className="col-md-10 text-center">
                  <h1 data-aos="fade-up" className="mb-5">
                    हमारा <span ref={typedRef} className="typed-words"></span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row mb-3 align-items-stretch">
                <div className="col-md-6 col-lg-6 mb-4 mb-lg-4">
                  <div className="h-entry">
                    <div className="h-entry-inner">
                      <h2 className="font-size-regular">
                        <a href="blog-single.html">
                          फिजियोथैरेपी के साथ क्रोनिक दर्द को अधिकतम करना
                        </a>
                      </h2>
                      <div className="meta mb-4">
                        द्वारा <a href="blog-single.html">प्रेम प्रकाश</a>{" "}
                        <span className="mx-2">&bullet;</span> मई 5, 2021
                      </div>
                      <p>
                        खोजें कि कैसे फिजियोथैरेपी विशेषज्ञ अभ्यास, मैनुअल
                        चिकित्सा, और पूर्णतया दृष्टिकोनी रणनीतियों के माध्यम से
                        क्रोनिक दर्द को कम करता है।{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-4 mb-lg-4">
                  <div className="h-entry">
                    <div className="h-entry-inner">
                      <h2 className="font-size-regular">
                        <a href="blog-single.html">सर्जरी के बाद पुनर्वास</a>
                      </h2>
                      <div className="meta mb-4">
                        द्वारा <a href="blog-single.html">प्रेम प्रकाश</a>{" "}
                        <span className="mx-2">&bullet;</span> नवंबर 21, 2022
                      </div>
                      <p>
                        जानें कि सर्जरी के बाद फिजियोथैरेपी कैसे मदद करती है,
                        जोड़ की जगह पर स्थानांतरण, स्पाइनल सर्जरी, और आर्थोपेडिक
                        प्रक्रियाओं के लिए शक्ति, गतिशीलता, और कार्यक्षमता को
                        पुनर्स्थापित करती है।
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-4 mb-lg-4">
                  <div className="h-entry">
                    <a href="blog-single.html">
                      <img
                        src="images/img_33.webp"
                        alt="फ्री वेबसाइट टेम्प्लेट द्वारा फ्री-टेम्प्लेट.co"
                        className="img-fluid"
                      />
                    </a>
                    <div className="h-entry-inner">
                      <h2 className="font-size-regular">
                        <a href="blog-single.html">कार्यस्थल चोट निवारण</a>
                      </h2>
                      <div className="meta mb-4">
                        द्वारा <a href="blog-single.html">प्रेम प्रकाश</a>{" "}
                        <span className="mx-2">&bullet;</span> जून 7, 2023
                      </div>
                      <p>
                        खोजें कि कैसे फिजियोथैरेपी एर्गोनोमिक मार्गदर्शन,
                        व्यक्तिगत व्यायाम, और बेहतर कल्याण के माध्यम से
                        कार्यस्थल संबंधित चोटों को रोकती है।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center mt-5">
                <p className="custom-pagination">
                  <span>1</span>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <span>...</span>
                  <a href="#">20</a>
                </p>
              </div>
            </div>

            <div className="col-md-3 ml-auto">
              <div className="mb-5">
                <h3 className="h5 text-black mb-3">खोज</h3>
                <form action="#" method="post">
                  <div className="form-group d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="खोज कीजिए और एंटर दबाएं..."
                    />
                  </div>
                </form>
              </div>

              <div className="mb-5">
                <h3 className="h5 text-black mb-3">लोकप्रिय पोस्ट</h3>
                <ul className="list-unstyled post-lists">
                  <li className="mb-2">
                    <a href="#">क्रोनिक दर्द और फिजियोथैरेपी</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">सर्जरी के बाद पुनर्वास</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">फिजियोथैरेपी के साथ कार्यस्थल चोटों को रोकना</a>
                  </li>
                </ul>
              </div>

              <div className="mb-5">
                <h3 className="h5 text-black mb-3">हाल के टिप्पणियाँ</h3>
                <ul className="list-unstyled post-lists">
                  <li className="mb-2">
                    <a href="#">विकेय</a> <em>में</em>{" "}
                    <a href="#">क्रोनिक दर्द और फिजियोथैरेपी</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">भोलु</a> <em>में</em>{" "}
                    <a href="#">सर्जरी के बाद पुनर्वास</a>
                  </li>
                  <li className="mb-2">
                    <a href="#">छोटका</a> <em>में</em>{" "}
                    <a href="#">फिजियोथैरेपी के साथ कार्यस्थल चोटों को रोकना</a>
                  </li>
                </ul>
              </div>
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
                पहले आनेवालों के लिए 30% तक क ी छूट
              </h2>
              <p className="mb-0 text-white lead">यहाँ!</p>
            </div>
            <div className="col-lg-4">
              <p className="mb-0">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffoTrMEMzFGiZF8QtC4zgejMu7LZ-0nlj7MUa1MlK7j5p5jA/viewform?embedded=true"
                  className="btn btn-outline-white text-white btn-md btn-pill px-5 font-weight-bold btn-block"
                >
                  हमसे संपर्क करें
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

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
                      <a href="#">सेवाएँ</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">हमसे संपर्क करें</a>
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
                      <a href="#">सेवाएँ</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">हमसे संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">विशेषताएँ</h2>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">हमारे बारे में</a>
                    </li>
                    <li>
                      <a href="#">सेवाएँ</a>
                    </li>
                    <li>
                      <a href="#">प्रशंसापत्र</a>
                    </li>
                    <li>
                      <a href="#">हमसे संपर्क करें</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 mb-5 mb-lg-0 col-lg-3">
                  <h2 className="footer-heading mb-4">हमें फॉलो करें</h2>
                  <a href="#" className="pl-0 pr-3">
                    <span className="icon-facebook"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-twitter"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-instagram"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-linkedin"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <h2 className="footer-heading mb-4">समाचार पत्रिका सदस्यता</h2>
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

export default Blog;
