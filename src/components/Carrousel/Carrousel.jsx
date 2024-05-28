import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "./Carrousel.css";

const Carrousel = ({ elements }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        interval={1500}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        dynamicHeight={false}
      >
        {elements.map((element) => (
          <div
            key={element._id}
            className="carousel-slide"
            onClick={() =>
              navigate("/produit", { state: { produit: element } })
            }
          >
            <div className="image-wrapper">
              <img
                src={`http://localhost:5000/images/${element.image}`}
                alt={element.nom}
                className="carousel-image"
              />
            </div>
            <div className="carousel-legend-container">
              <p className="carousel-legend">{element.nom}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrousel;
