import axios from "axios";
import React, { useEffect, useState } from "react";
import Produit from "../../components/Produit/Produit";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import actions from "../../redux/actions";
import Carrousel from "../../components/Carrousel/Carrousel";

const Home = () => {
  const [filtredProduits, setFiltredProduits] = useState([]);
  const [produits, setProduits] = useState([]);
  const utilisateur = useSelector((state) => state.utilisateur);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        dispatch({ type: actions.error, error: erreur.message });
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
      .catch((erreur) =>
        dispatch({ type: actions.error, error: erreur.message })
      );
  }

  function listeProduits() {
    axios
      .get(process.env.REACT_APP_URL + "/produit")
      .then((reponse) => {
        setProduits(reponse.data);
      })
      .catch((erreur) =>
        dispatch({ type: actions.error, error: erreur.message })
      );
  }
  useEffect(() => {
    if (utilisateur && utilisateur.role === "admin") {
      tousProduits();
    } else {
      listeProduits();
    }
  }, []);

  // Fonction pour choisir des éléments aléatoires
  function choisirElementsAleatoires(tableau, nombre) {
    // Vérification si le nombre demandé est supérieur à la longueur du tableau
    if (nombre > tableau.length) {
      console.error(
        "Le nombre demandé est supérieur à la longueur du tableau !"
      );
      return;
    }

    let elementsChoisis = [];

    // Boucle pour choisir des éléments aléatoires
    while (elementsChoisis.length < nombre) {
      let indexAleatoire = Math.floor(Math.random() * tableau.length);
      let elementChoisi = tableau[indexAleatoire];

      // Vérification si l'élément choisi n'est pas déjà dans le tableau des éléments choisis
      if (!elementsChoisis.includes(elementChoisi)) {
        elementsChoisis.push(elementChoisi);
      }
    }

    return elementsChoisis;
  }

  // Appel de la fonction pour choisir 5 éléments aléatoires
  let elementsAleatoires = choisirElementsAleatoires(produits, 5);

  return (
    <Stack height={"100%"} position={"relative"}>
      {utilisateur && utilisateur.role === "admin" && (
        <Button
          sx={{ width: 200, m: "5px" }}
          color="success"
          variant="contained"
          onClick={() => {
            navigate("/ajout_produit");
          }}
        >
          Ajouter produit
        </Button>
      )}
      {(utilisateur == null || utilisateur.role == "client") &&
        elementsAleatoires && <Carrousel elements={elementsAleatoires} />}
      <Stack alignItems={"flex-start"} flexDirection={"row"}>
        <Search setProduits={setFiltredProduits} produits={produits} />

        <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
          {filtredProduits.map((produit) => {
            return (
              <Produit
                key={produit._id}
                produit={produit}
                supprimer={supprimer}
                clickModifier={clickModifier}
                getAll={tousProduits}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
