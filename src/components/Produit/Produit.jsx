import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "../../redux/actions";

const Produit = ({ produit, supprimer, clickModifier, getAll }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const utilisateur = useSelector((state) => state.utilisateur);
  function Restaurer() {
    axios
      .put(process.env.REACT_APP_URL + "/produit/restore/" + produit._id)
      .then((reponse) => {
        getAll();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  return (
    <Stack
      m={"10px"}
      position={"relative"}
      height={400}
      width={250}
      sx={{
        background: "#bbcfe275",
        padding: "5px",
        borderRadius: "16px",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          color: "#1976d2",
          textDecoration: produit.supprime ? "line-through" : "none",
          fontSize: 26,
          fontWeight: 800,
        }}
        align="center"
      >
        {produit.nom}
      </Typography>
      <Typography>{produit.prix + " DT"}</Typography>
      <img
        onClick={() => {
          navigate("/produit", { state: { produit } });
        }}
        style={{ height: "100%", width: "auto", objectFit: "cover" }}
        src={"http://localhost:5000/images/" + produit.image}
      />
      <Stack
        width={"100%"}
        position={"absolute"}
        bottom={5}
        spacing={1}
        alignItems={"center"}
      >
        {produit.supprime ? (
          <Button onClick={() => Restaurer()}>Restorer</Button>
        ) : (
          utilisateur.role !== "client" && (
            <>
              <Button
                sx={{ width: "118px" }}
                onClick={() => {
                  clickModifier(produit);
                }}
                color="warning"
                variant="contained"
              >
                Modifier
              </Button>
              <Button
                sx={{ width: "118px" }}
                onClick={() => {
                  supprimer(produit);
                }}
                color="error"
                variant="contained"
              >
                Supprimer
              </Button>
            </>
          )
        )}
      </Stack>
    </Stack>
  );
};

export default Produit;
