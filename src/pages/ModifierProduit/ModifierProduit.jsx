import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const ModifierProduit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [produit, setProduit] = useState(location.state.produit);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      nom: produit.nom,
      prix: produit.prix,
      qte: produit.qte,
      taille: produit.taille,
      idCategorie: produit.idCategorie,
      image: null,
    },
  });

  function ModifierAction(data) {
    const { nom, prix, qte, taille, idCategorie } = data;
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("qte", qte);
    formData.append("taille", taille);
    formData.append("image", image);
    formData.append("idCategorie", idCategorie);

    axios
      .put(process.env.REACT_APP_URL + "/produit/" + produit._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((reponse) => {
        navigate("/");
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  }

  useEffect(() => {
    setValue("nom", location.state.produit.nom);
    setValue("prix", location.state.produit.prix);
    setValue("qte", location.state.produit.qte);
    setValue("taille", location.state.produit.taille);
  }, [location]);

  function getCategories() {
    axios
      .get(process.env.REACT_APP_URL + "/categorie")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Typography>Modifier un produit</Typography>
      <form onSubmit={handleSubmit(ModifierAction)}>
        <Controller
          control={control}
          name="nom"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                value={value}
                onChange={onChange}
                label="Nom du produit"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="taille"
          rules={{ min: { value: 1, message: "modidier la taille" } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                type="number"
                value={value}
                onChange={onChange}
                label="Taille du produit"
                error={!!error}
                helperText={error && error.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="qte"
          rules={{ min: { value: 1, message: "modifier la quantité" } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                type="number"
                value={value}
                onChange={onChange}
                label="Quantité du produit"
                error={!!error}
                helperText={error && error.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="prix"
          rules={{ min: { value: 0, message: "modifier le prix" } }}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                type="number"
                value={value}
                onChange={onChange}
                label="Prix du produit"
                error={!!error}
                helperText={error && error.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="idCategorie"
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <FormControl>
                <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                <Select
                  sx={{ width: "222.4px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Catégorie"
                  onChange={onChange}
                >
                  {categories.map((categorie) => {
                    return (
                      <MenuItem value={categorie._id}>{categorie.nom}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="image"
          rules={{ min: { value: 0, message: "modifier le prix" } }}
          render={({ fieldState: { error } }) => {
            return (
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(i) => {
                  setImage(i.target.files[0]);
                }}
              />
            );
          }}
        />

        <Button type="submit" variant="contained" color="success">
          Modifier Produit
        </Button>
      </form>
    </>
  );
};

export default ModifierProduit;
