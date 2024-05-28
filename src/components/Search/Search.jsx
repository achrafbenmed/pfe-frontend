import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import actions from "../../redux/actions";

const Search = ({ setProduits, produits }) => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState([0, 0]);
  const [nom, setNom] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const marks = [
    { value: 0, label: "0Dt" },
    { value: 500, label: "500Dt" },
    { value: 1000, label: "1000Dt" },
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
      nom === ""
        ? produits
        : produits.filter((produit) =>
            produit.nom.toLowerCase().includes(nom.toLowerCase())
          );

    const filterCategorie =
      categorie === ""
        ? filterName
        : filterName.filter((produit) => produit.idCategorie._id === categorie);

    const filterPrix =
      prix[0] === 0 && prix[1] === 0
        ? filterCategorie
        : filterCategorie.filter(
            (produit) => produit.prix >= prix[0] && produit.prix <= prix[1]
          );

    setProduits(filterPrix);
  };

  useEffect(() => {
    filterProduits();
  }, [produits, categorie, prix, nom]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          zIndex: 1300,
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ elevation: 8 }}
      >
        <Box
          sx={{
            width: 350,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "background.paper",
            padding: "30px",
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Rechercher des Produits
          </Typography>
          <FormControl margin="normal">
            <FormLabel id="name-label">Nom</FormLabel>
            <TextField
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              label="Nom"
              id="name-input"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Catégorie</FormLabel>
            <RadioGroup
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              aria-labelledby="category-radio-group"
              name="category-group"
            >
              {categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  value={category._id}
                  control={<Radio />}
                  label={category.nom}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Prix</FormLabel>
            <Slider
              marks={marks}
              max={1000}
              value={prix}
              onChange={(e, newValue) => setPrix(newValue)}
              valueLabelDisplay="auto"
              aria-labelledby="price-slider"
              sx={{ marginTop: 2 }}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              setCategorie("");
              setNom("");
              setPrix([0, 0]);
              setProduits(produits);
            }}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Reset
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Search;
