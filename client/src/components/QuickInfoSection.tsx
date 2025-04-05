import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const QuickInfoSection: React.FC = () => {
  return (
    <div className="block-quick-info-2">
      <div className="container">
        <div className="block-quick-info-2-inner">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faHome} />
                </span>
                <div className="text">
                  <strong className="d-block heading">हमारा स्थान</strong>
                  <span className="excerpt">
                    सुनील बोस के पास, कैनाल रोड - डेहरी 821307
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div className="text">
                  <strong className="d-block heading">आज हमें कॉल करें</strong>
                  <span className="excerpt">
                    <a href="tel:+917004119766">+917004119766</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div className="text">
                  <strong className="d-block heading">हमें संदेश भेजें</strong>
                  <span className="excerpt">
                    <a href="mailto:Samarthclinic.info@gmail.com">
                      Samarthclinic.info@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
              <div className="d-flex quick-info-2">
                <span className="icon mr-3">
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <div className="text">
                  <strong className="d-block heading">खुलने का समय</strong>
                  <span className="excerpt">सोम-शनि 10:00 AM - 06:00 PM</span>
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
