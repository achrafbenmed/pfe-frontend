import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import actions from "../../redux/actions";
import { useDispatch } from "react-redux";

const ModifierUtilisateur = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const utilisateur = location.state.utilisateur;
  const path = location.state.path;
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      cin: utilisateur.cin,
      email: utilisateur.email,
      role: utilisateur.role,
      tel: utilisateur.tel,
      date_naissance: dayjs(utilisateur.date_naissance),
      sexe: utilisateur.sexe,
    },
  });

  const modifierSubmit = (data) => {
    axios
      .put(process.env.REACT_APP_URL + "/utilisateur/" + utilisateur._id, data)
      .then((reponse) => {
        dispatch({ type: actions.success, success: "Profil modifié" });
        navigate(path);
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <div>
        <h1>Modifier un Utilisateur existant</h1>
        <form onSubmit={handleSubmit(modifierSubmit)}>
          <Controller
            control={control}
            name="nom"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField label="Nom" value={value} onChange={onChange} />
              );
            }}
          />
          <Controller
            control={control}
            name="prenom"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField label="Prénom" value={value} onChange={onChange} />
              );
            }}
          />
          <Controller
            control={control}
            name="cin"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Cin"
                  type="number"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="tel"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Numéro De Télephone"
                  type="number"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="date_naissance"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <DatePicker
                  label="Date De Naissance"
                  format="DD/MM/YYYY"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="sexe"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Sexe
                  </FormLabel>
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="femme"
                      control={<Radio />}
                      label="Femme"
                    />
                    <FormControlLabel
                      value="homme"
                      control={<Radio />}
                      label="Homme"
                    />
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
          <Controller
            control={control}
            name="email"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Adresse Email"
                  type="email"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="role"
            required
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Select
                  value={value}
                  onChange={onChange}
                  label="Role d'Utilisateur"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="vendeur">Vendeur</MenuItem>
                  <MenuItem value="vendeur_super">Super Vendeur</MenuItem>
                </Select>
              );
            }}
          />
          <Button color="warning" variant="contained" type="submit">
            Modifier
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default ModifierUtilisateur;
