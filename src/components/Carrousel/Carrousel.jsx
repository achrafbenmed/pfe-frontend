import React, { Component } from "react";
import "./Carrousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

const Carrousel = ({ elements }) => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 30 }}>
      <Carousel autoPlay infiniteLoop interval={2000}>
        {elements.map((element) => (
          <div onClick={() => {}}>
            <img
              onClick={() => {
                navigate("/produit", { state: { produit: element } });
              }}
              src={"http://localhost:5000/images/" + element.image}
            />
            <p className="legend">{element.nom}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrousel;
