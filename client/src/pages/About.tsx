import { useEffect, useRef } from "react";
import Typed from "typed.js";
import AOS from "aos";

const About = () => {
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
        strings: ["कंपनी"],
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
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-11 col-xl-4">
              <h1 className="mb-0 site-logo">
                <a href="index.html" className="text-white mb-0">
                  समर्थ क्लिनिक<span className="text-primary">.</span>
                </a>
              </h1>
              <p className="text-white mb-0" style={{ fontSize: "0.7rem" }}>
                फिजियोथैरेपी रिहैबिलिटेशन सेंटर
              </p>
            </div>
            <div className="col-12 col-md-8 d-none d-xl-block">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <a href="index.html">
                      <span>होम</span>
                    </a>
                  </li>
                  <li className="has-children">
                    <a href="services.html">
                      <span>सेवाएं</span>
                    </a>
                    <ul className="dropdown arrow-top">
                      <li>
                        <a href="#">फिजिकल थेरेपी</a>
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
                  <li className="active">
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
                      <span>संपर्क</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              style={{ position: "relative", top: "3px" }}
            >
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle text-white"
              >
                <span className="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: "url(images/hero_bg_1.jpg)" }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10">
              <div className="row justify-content-center mb-4">
                <div className="col-md-10 text-center">
                  <h1 data-aos="fade-up" className="mb-5">
                    हमारे बारे में{" "}
                    <span ref={typedRef} className="typed-words"></span>
                  </h1>
                  <p data-aos="fade-up" data-aos-delay="100">
                    <a href="#" className="btn btn-primary btn-pill">
                      शुरू करें
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="images/hero_bg_22.webp"
                alt="Image"
                className="img-fluid rounded mb-3"
              />
              <img
                src="images/hero_bg_11.webp"
                alt="Image"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-5 ml-auto">
              <h2 className="text-primary mb-3">हमारे इतिहास के बारे में</h2>
              <p className="lead">
                समर्थ क्लिनिक ने फिजियोथेरेपी के क्षेत्र में एक वर्ष से अधिक समय
                तक हमारे समुदाय की सेवा की है, हमारे मरीजों की भलाई को बढ़ाने के
                लिए समर्पण और प्रतिबद्धता के साथ। हमारी यात्रा साधारण शुरुआत से
                एक प्रमुख फिजियोथेरेपी केंद्र बनने तक निरंतर वृद्धि, नवाचार और
                अद्वितीय रोगी-केंद्रित देखभाल की कहानी रही है।
              </p>
              <p className="mb-4">
                हमारी स्थापना का दृष्टिकोण -- समर्थ क्लिनिक की स्थापना 2022 में
                डॉ. प्रेम प्रकाश द्वारा की गई थी, जो एक कुशल और संवेदनशील
                फिजियोथेरेपिस्ट हैं, जिनका उद्देश्य सभी उम्र के व्यक्तियों को
                उच्च गुणवत्ता वाली पुनर्वास देखभाल प्रदान करना था। डॉ. प्रेम
                प्रकाश का उद्देश्य एक स्वागत योग्य और सहायक वातावरण बनाना था,
                जहां मरीज ठीक हो सकें, अपनी ताकत वापस पा सकें और जीवन की बेहतर
                गुणवत्ता का आनंद ले सकें।
              </p>
              <p>
                वृद्धि और विशेषज्ञता -- वर्षों के साथ, हमने अपनी सेवाओं और
                विशेषज्ञता का विस्तार किया है, एक बहुविषयक टीम बनाते हुए, जिसमें
                लाइसेंस प्राप्त फिजियोथेरेपिस्ट, पुनर्वास विशेषज्ञ और सहायक
                कर्मचारी शामिल हैं। हमारी प्रैक्टिस ने आकार और प्रतिष्ठा दोनों
                में वृद्धि की है, मस्कुलोस्केलेटल और न्यूरोलॉजिकल स्थितियों की
                एक विस्तृत श्रृंखला को संबोधित करने में उत्कृष्टता का ट्रैक
                रिकॉर्ड स्थापित किया है।
              </p>
              <p className="mb-4">
                हमारे साथ अपनी चिकित्सा यात्रा पर शामिल हों -- समर्थ क्लिनिक
                में, हम उपचार की शक्ति और हर व्यक्ति की अपनी सबसे अच्छी जीवन
                जीने की क्षमता में विश्वास करते हैं। चाहे आप चोट से उबर रहे हों,
                एक पुरानी स्थिति का प्रबंधन कर रहे हों, या अपनी शारीरिक प्रदर्शन
                को सुधारना चाहते हों, हम आपके हर कदम पर समर्थन करने के लिए यहां
                हैं। हमें आपके स्वास्थ्य और कल्याण के साथी के रूप में चुनने के
                लिए धन्यवाद। हम आपके स्वस्थ, अधिक सक्रिय जीवन की यात्रा का
                हिस्सा बनने की आशा करते हैं। आज ही संपर्क करें और पीस्क्वायर पर
                अंतर का अनुभव करें।
              </p>
              <ul className="ul-check list-unstyled success">
                <li>"200 से अधिक मरीजों का सफल परिणामों के साथ उपचार किया।"</li>
                <li>
                  "तेजी से पुनर्प्राप्ति के लिए नवाचार पुनर्वास तकनीकों की
                  अग्रणी।"
                </li>
                <li>"समीक्षाओं के आधार पर 98% रोगी संतुष्टि दर तक पहुंचा।"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="text-primary mb-3">हमारे कर्मचारी</h2>
              <p>
                "हमारी समर्पित टीम, व्यापक अनुभव और व्यक्तिगत देखभाल के साथ,
                फिजियोथेरेपी के माध्यम से आपकी भलाई को बढ़ाने के लिए प्रयास करती
                है, आपकी पुनर्प्राप्ति के मार्ग को सुनिश्चित करती है।"
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-6 mb-4 mb-lg-5 text-center">
              <img
                src="images/premprofile.jpg"
                alt="Image"
                className="img-fluid mb-3 w-50 rounded-circle"
              />
              <h3 className="h4">डॉ. प्रेम प्रकाश</h3>
              <p className="caption text-primary">वरिष्ठ चिकित्सक</p>
              <p>बैचलर इन फिजियोथेरेपी</p>
            </div>
            <div className="col-md-6 col-lg-6 mb-4 mb-lg-5 text-center">
              <img
                src="images/drsrikrishna.jpg"
                alt="Image"
                className="img-fluid mb-3 w-50 rounded-circle"
              />
              <h3 className="h4">डॉ. सीके सिन्हा</h3>
              <p className="caption text-primary">वरिष्ठ डॉक्टर एनएमसीएच</p>
              <p>एमबीबीएस एमडी</p>
            </div>
            <div className="col-md-6 col-lg-6 mb-4 mb-lg-5 text-center">
              <img
                src="images/person2.jpg"
                alt="Image"
                className="img-fluid mb-3 w-50 rounded-circle"
              />
              <h3 className="h4">विकास कुमार गुप्ता</h3>
              <p className="caption text-primary">बीएससी डीएमएलटी</p>
              <p>प्रयोगशाला सहायक</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-5 block-cta-1 primary-overlay"
        style={{ backgroundImage: "url('images/hero_bg_2.jpg')" }}
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
                    <span className="icon-facebook"></span>
                  </a>
                  <a href="#" className="pl-3 pr-3">
                    <span className="icon-twitter"></span>
                  </a>
                  <a
                    href="https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3"
                    className="pl-3 pr-3"
                  >
                    <span className="icon-instagram"></span>
                  </a>
                  <a
                    href="https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN"
                    className="pl-3 pr-3"
                  >
                    <span className="icon-youtube"></span>
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
              <p>कॉपीराइट &copy; 2023 सभी अधिकार सुरक्षित हैं।</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
