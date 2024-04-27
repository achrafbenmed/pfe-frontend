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
import { useNavigate } from "react-router-dom";

const AjoutProduit = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nom: "",
      prix: 0,
      qte: 1,
      taille: 16,
      idCategorie: null,
      image: null,
    },
  });

  function getCategories() {
    axios
      .get(process.env.REACT_APP_URL + "/categorie")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) => {});
  }

  function ajoutAction(data) {
    const { nom, prix, qte, taille, idCategorie } = data;
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("qte", qte);
    formData.append("taille", taille);
    formData.append("image", image);
    formData.append("idCategorie", idCategorie);

    axios
      .post(process.env.REACT_APP_URL + "/produit", formData, {
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
    getCategories();
  }, []);
  return (
    <>
      <Typography>Ajouter un produit</Typography>
      <form onSubmit={handleSubmit(ajoutAction)}>
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
          rules={{ min: { value: 1, message: "vérifier la taille" } }}
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
          rules={{ min: { value: 1, message: "vérifier la quantité" } }}
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
          rules={{ min: { value: 0, message: "vérifier le prix" } }}
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
          rules={{ min: { value: 0, message: "vérifier le prix" } }}
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
          Ajouter produit
        </Button>
      </form>
    </>
  );
};

export default AjoutProduit;
