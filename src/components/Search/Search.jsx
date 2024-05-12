import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import actions from "../../redux/actions";
import { useDispatch } from "react-redux";

const Search = ({ setProduits, produits }) => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = React.useState([0, 0]);
  const [nom, setNom] = React.useState("");
  const dispatch = useDispatch();

  const marks = [
    {
      value: 0,
      label: "0Dt",
    },

    {
      value: 500,
      label: "500Dt",
    },
    {
      value: 1000,
      label: "1000Dt",
    },
  ];

  const getCategories = () => {
    axios
      .get(process.env.REACT_APP_URL + "/categorie")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filterProduits = () => {
    const filterName =
      nom == ""
        ? produits
        : produits.filter((produit) => {
            return produit.nom.toLowerCase().includes(nom.toLowerCase());
          });

    const filterCategorie =
      categorie == ""
        ? filterName
        : filterName.filter((produit) => {
            return produit.idCategorie._id === categorie;
          });

    const filterPrix =
      prix[0] == 0 && prix[1] == 0
        ? filterCategorie
        : filterCategorie.filter((produit) => {
            return produit.prix >= prix[0] && produit.prix <= prix[1];
          });
    setProduits(filterPrix);
  };
  useEffect(() => {
    filterProduits();
  }, [produits, categorie, prix, nom]);

  return (
    <Stack
      flexDirection={"column"}
      bgcolor={"#80808042"}
      position={"relative"}
      minHeight={"100vh"}
      width={300}
      padding={"30px"}
      spacing={8}
      height={"-webkit-fill-available"}
    >
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Nom</FormLabel>
        <TextField
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          label="Nom"
          id="demo-radio-buttons"
        />
      </FormControl>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Catégorie</FormLabel>
        <RadioGroup
          value={categorie}
          onChange={(e) => {
            setCategorie(e.target.value);
          }}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {categories.map((category) => {
            return (
              <FormControlLabel
                value={category._id}
                control={<Radio />}
                label={category.nom}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Slider
        marks={marks}
        sx={{ width: "75%" }}
        max={1000}
        getAriaLabel={() => "Temperature range"}
        value={prix}
        onChange={(e) => {
          setPrix(e.target.value);
        }}
        valueLabelDisplay="auto"
      />
      <Button
        variant="contained"
        type="reset"
        onClick={() => {
          setCategorie("");
          setNom("");
          setPrix([0, 0]);
          setProduits(produits);
        }}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default Search;
