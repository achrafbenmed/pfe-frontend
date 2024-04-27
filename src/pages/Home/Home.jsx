import axios from "axios";
import React, { useEffect, useState } from "react";
import Produit from "../../components/Produit/Produit";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const Home = () => {
  const [produits, setProduits] = useState([]);
  const utilisateur = useSelector((state) => state.utilisateur);
  const navigate = useNavigate();
  function supprimer(produit) {
    axios
      .delete(process.env.REACT_APP_URL + "/produit/" + produit._id)
      .then(() => {
        if (utilisateur.role === "admin") {
          tousProduits();
        } else {
          listeProduits();
        }
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  }

  function clickModifier(produit) {
    navigate("/produit/" + produit._id, { state: { produit } });
  }

  function tousProduits() {
    axios
      .get(process.env.REACT_APP_URL + "/produit/getAll")
      .then((reponse) => {
        setProduits(reponse.data);
      })
      .catch((error) => console.log(error));
  }

  function listeProduits() {
    axios
      .get(process.env.REACT_APP_URL + "/produit")
      .then((reponse) => {
        setProduits(reponse.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (utilisateur.role === "admin") {
      tousProduits();
    } else {
      listeProduits();
    }
  }, []);

  return (
    <Stack alignItems={"flex-start"}>
      {utilisateur.role === "admin" && (
        <Button
          onClick={() => {
            navigate("/ajout_produit");
          }}
        >
          Ajouter produit
        </Button>
      )}
      <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
        {produits.map((produit) => {
          return (
            <Produit
              produit={produit}
              supprimer={supprimer}
              clickModifier={clickModifier}
              getAll={tousProduits}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Home;
