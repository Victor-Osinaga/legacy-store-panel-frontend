import "./pricing.css";
import { useState } from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Básico",
      description: "Perfecto para pequeñas empresas que comienzan.",
      "price-month": "20.000",
      points: [
        "Hasta 500 productos",
        "Soporte por email",
        "Personalización básica",
        "Adaptado a móviles",
      ],
    },
    {
      name: "Avanzado",
      description: "Ideal para negocios en crecimiento con más necesidades.",
      "price-month": "40.000",
      points: [
        "Hasta 1.000 productos",
        "Soporte por email",
        "Personalización básica",
        "Adaptado a móviles",
      ],
    },
    {
      name: "Profesional",
      description:
        "Para empresas establecidas que requieren funciones avanzadas.",
      "price-month": "100.000",
      points: [
        "Productos ilimitados",
        "Soporte por email",
        "Personalización básica",
        "Adaptado a móviles",
      ],
    },
    // {
    //   name: "Premium",
    //   description: "Perfecto para pequeñas empresas que comienzan",
    //   price: 100.0,
    //   points: [
    //     "Hasta 100 productos",
    //     "Soporte por email",
    //     "Personalización básica",
    //     "Adaptado a móviles",
    //   ],
    // },
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (event) => {
    setIsChecked(event.target.checked);
    console.log("¿Switch activado?", event.target.checked);
  };

  return (
    <>
      <section id="plans" className="textWhiteMedium-Custom">
        <div className="text-center mb-5">
          <h2 className="mb-4 fw-bold fontXXL-Custom">
            Elige el mejor plan para tu negocio
          </h2>
          <h5 className="mb-4 fontBase-Custom textGray300-Custom">
            Selecciona el plan perfecto para tu negocio. Puedes cambiar de plan
            en cualquier momento.
          </h5>
          <div className="d-flex gap-2 justify-content-center mb-2 align-items-center">
            <span
              className={`planType ${
                isChecked
                  ? "textGray500-Custom fw-semibold fontSM-Custom "
                  : "fw-semibold "
              }`}
            >
              Mensual
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span className="slider"></span>
            </label>
            <span
              className={`planType ${
                isChecked
                  ? "fw-semibold "
                  : "textGray500-Custom fw-semibold fontSM-Custom "
              }`}
            >
              Anual
            </span>
          </div>
          <div style={{ height: "20px" }}>
            {isChecked && <span>Ahorre hasta un 30%</span>}
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5">
          {plans.map((p, i) => {
            return (
              <div key={i} className="card-container py-5 px-5">
                <h3 className="text-center mb-4 fontXXL-Custom fw-bold">
                  {p.name}
                </h3>
                <p className="text-center textGray300-Custom fontSM-Custom">
                  {p.description}
                </p>
                <p className="text-center mb-4">
                  <span className="plans-price fw-bold me-3">
                    $ {p["price-month"]}
                  </span>{" "}
                  <span className="textGray300-Custom ">/ mes</span>
                </p>
                <div className="mb-5">
                  {p.points.map((e) => {
                    return (
                      <>
                        <ul>
                          <li>° {e}</li>
                        </ul>
                      </>
                    );
                  })}
                </div>
                <button
                  className="btnLogin rounded-0 text-white"
                  type="submit"
                  value="Submit"
                >
                  <p className="m-0 fw-semibold">EMPEZAR</p>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
