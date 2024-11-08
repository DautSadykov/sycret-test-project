import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCertId } from "../features/certIdKeeper/certId";
import { URL_LINK, API_KEY } from "../config.js"



function CertChoice() {
  const methodName = "OSGetGoodList";
  const url = new URL(URL_LINK);
  url.searchParams.append("ApiKey", API_KEY);
  url.searchParams.append("MethodName", methodName);

  const dispatch = useDispatch();
  const [certs, setCerts] = useState([]);
  const [currentCertPrice, setCurrentCertPrice] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCerts(result.data);
      })
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  const handleSelectChange = (event) => {
    const certId = event.target.value
    dispatch(setCertId(certId));
    const currentPrice = certs.find(cert => cert.ID == certId).REC_SUM
    setCurrentCertPrice("К оплате: " + parseInt(currentPrice) + " руб.")
  };

  if (!certs.length) {
    return <h3>загружаем сертификаты...</h3>;
  }

  return (
    <div className="choose-cert">
      <select
        className="choose-cert__cert-selector"
        onChange={handleSelectChange}
      >
        {certs.map((cert) => (
          <option key={cert.ID} value={cert.ID}>
            {cert.NAME}
          </option>
        ))}
      </select>
      <div className="choose-cert__cert-confirm">
        <span className="choose-cert__cert-price">{currentCertPrice}</span>
        <Link to="/form">
          <button>Оформить</button>
        </Link>
      </div>
    </div>
  );
}

export default CertChoice;
