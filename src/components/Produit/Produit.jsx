import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "../../redux/actions";

const Produit = ({ produit, supprimer, clickModifier, getAll }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { utilisateur } = useSelector((state) => state);

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

  const handleClick = () => {
    if (utilisateur) {
      navigate("/produit", { state: { produit } });
    } else {
      navigate("/connecter");
      dispatch({
        type: actions.error,
        error: "Vous devez être connecté",
      });
    }
  };

  return (
    <Stack
      m={"10px"}
      sx={{
        position: "relative",
        height: 400,
        width: 250,
        borderRadius: "20px",
        cursor: "pointer",
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        "&:hover": {
          boxShadow:
            "0 6px 12px rgba(0, 0, 0, 0.15), 0 8px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={handleClick}
    >
      <img
        src={`http://localhost:5000/images/${produit.image}`}
        alt={produit.nom}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          bottom: 80,
          left: 20,
          zIndex: 2,
          textDecoration: produit.supprime ? "line-through" : "none",
          fontSize: "22px",
          lineHeight: "28px",
          color: "#fff",
          fontWeight: 700,
          letterSpacing: "0.1em",
          fontFamily: "Roboto, sans-serif",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        {produit.nom}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          bottom: 50,
          left: 20,
          zIndex: 2,
          textDecoration: produit.supprime ? "line-through" : "none",
          fontSize: "20px",
          lineHeight: "26px",
          color: "#fff",
          fontWeight: 500,
          letterSpacing: "0.1em",
          fontFamily: "Roboto, sans-serif",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        {produit.prix} DT
      </Typography>
      <Stack
        width={"100%"}
        position={"absolute"}
        bottom={10}
        spacing={1}
        alignItems={"center"}
        zIndex={2}
      >
        {produit.supprime ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              Restaurer();
            }}
            color="primary"
            variant="contained"
            sx={{ width: "118px" }}
          >
            Restaurer
          </Button>
        ) : (
          utilisateur &&
          utilisateur.role !== "client" && (
            <>
              <Button
                sx={{ width: "118px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  clickModifier(produit);
                }}
                color="warning"
                variant="contained"
              >
                Modifier
              </Button>
              <Button
                sx={{ width: "118px" }}
                onClick={(e) => {
                  e.stopPropagation();
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
