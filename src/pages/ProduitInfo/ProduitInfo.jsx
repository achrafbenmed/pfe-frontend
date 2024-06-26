import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import actions from "../../redux/actions";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const ProduitInfo = () => {
  const location = useLocation();
  const { utilisateur, panier } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      date_debut: null,
      date_fin: null,
      produit: null,
      qte: 0,
    },
  });

  function ajoutReservation(data) {
    const { date_debut, date_fin, qte } = data;
    const montant =
      parseInt(qte) *
      location.state.produit.prix *
      (dayjs(date_fin).diff(date_debut, "days") + 1);
    const p = {
      produit: location.state.produit,
      date_debut,
      date_fin,
      montant,
      qte: parseInt(qte),
    };

    const exist = panier.find((item) => {
      return item.produit === p.produit;
    });
    if (exist) {
      alert("déjà pris");
      return;
    } else {
      dispatch({
        type: actions.addToCart,
        item: p,
      });
      setOpen(false);
      reset();
      dispatch({
        type: actions.success,
        success: "Produit ajouté au panier",
      });
    }

    // axios
    //   .post(process.env.REACT_APP_URL + "/reservation", {
    //     id_produit: location.state.produit._id,
    //     id_utilisateur: utilisateur._id,
    //     date_debut,
    //     date_fin,
    //     montant,
    //   })
    //   .then((reponse) => {
    //     setOpen(false);
    //     reset();
    //     dispatch({
    //       type: actions.success,
    //       success: "Réservation enregistrée. L'admin va l'approuvée",
    //     });
    //   })
    //   .catch((erreur) => {
    //     dispatch({ type: actions.error, error: erreur.message });
    //   });
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <div style={{ padding: "20px" }}>
        <Typography
          textAlign={"center"}
          textTransform={"capitalize"}
          fontSize={45}
          fontWeight={900}
          fontStyle={"italic"}
          sx={{ color: "#2c3e50", marginBottom: 3 }}
        >
          {location.state.produit.nom}
        </Typography>
        <Stack direction={"row"} spacing={3}>
          <Box
            sx={{
              width: "50vw",
              height: "65vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              src={
                "http://localhost:5000/images/" + location.state.produit.image
              }
            />
          </Box>
          <Stack justifyContent={"space-between"} spacing={2} sx={{ flex: 1 }}>
            <Typography variant="h6">{`Catégorie : ${location.state.produit.idCategorie.nom}`}</Typography>
            <Typography variant="h6">{`Prix : ${location.state.produit.prix} DT`}</Typography>
            <Typography variant="h6">{`Quantité disponible : ${location.state.produit.qte}`}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              sx={{ alignSelf: "flex-start" }}
            >
              Passer une commande
            </Button>
          </Stack>
        </Stack>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(ajoutReservation)}>
            <Stack spacing={3}>
              <Controller
                control={control}
                name="date_debut"
                rules={{
                  required: {
                    value: true,
                    message: "Veiller saisir la date du début",
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <DatePicker
                      minDate={dayjs()}
                      maxDate={watch("date_fin")}
                      value={value}
                      label="Date de début"
                      onChange={onChange}
                      format="DD/MM/YYYY"
                    />
                    {error && (
                      <Typography color={"error"}>{error.message}</Typography>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="date_fin"
                rules={{
                  required: {
                    value: true,
                    message: "Veiller saisir la date du retour",
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <DatePicker
                      minDate={watch("date_debut")}
                      label="Date de retour"
                      value={value}
                      onChange={onChange}
                      format="DD/MM/YYYY"
                    />
                    {error && (
                      <Typography color={"error"}>{error.message}</Typography>
                    )}
                  </>
                )}
              />
              <Controller
                control={control}
                name="qte"
                rules={{
                  max: {
                    value: location.state.produit.qte,
                    message: `Quantité maximale est ${location.state.produit.qte}`,
                  },
                  min: { value: 1, message: "Quantité minimale est 1" },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Quantité"
                    error={!!error}
                    helperText={error && error.message}
                  />
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Ajouter une commande
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ProduitInfo;
