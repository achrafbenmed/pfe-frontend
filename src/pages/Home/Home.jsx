import axios from "axios";
import React, { useEffect, useState } from "react";
import Produit from "../../components/Produit/Produit";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import actions from "../../redux/actions";

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

  return (
    <Stack height={"100%"} position={"absolute"}>
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
