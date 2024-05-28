import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [produits, setProduits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.REACT_APP_URL + "/produit/getAll")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            Bienvenue à Notre Boutique de Location de Vêtements
          </h1>
          <p className="subtitle">
            Louez vos vêtements préférés pour chaque occasion
          </p>
          <button className="cta-button" onClick={() => navigate("/home")}>
            Découvrir Maintenant
          </button>
        </div>
      </header>

      <section className="about">
        <h2>À Propos de Nous</h2>
        <p>
          Nous offrons une vaste sélection de vêtements de haute qualité pour
          chaque occasion. Que ce soit pour un mariage, une fête, ou une réunion
          professionnelle, vous trouverez ce qu'il vous faut dans notre
          boutique.
        </p>
      </section>

      <section className="featured-products">
        <h2>Produits en Vedette</h2>
        <div className="product-grid">
          {produits.slice(0, 4).map((produit) => (
            <div key={produit.id} className="product-card">
              <img
                src={"http://localhost:5000/images/" + produit.image}
                alt={produit.nom}
                className="product-image"
              />
              <h3>{produit.nom}</h3>
              <p>{produit.prix}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
