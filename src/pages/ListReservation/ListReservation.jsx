import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ListReservation = () => {
  const utilisateur = useSelector((state) => state.utilisateur);
  const [reservations, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [produits, setProduits] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      date_debut: null,
      date_fin: null,
      montant: "",
      id_produit: null,
    },
  });

  function tousReservations() {
    axios
      .get(process.env.REACT_APP_URL + "/reservation/getAll")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((error) => console.log(error));
  }

  function getReservations() {
    axios
      .get(process.env.REACT_APP_URL + "/reservation")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) => {});
  }

  useEffect(() => {
    listeProduits();
    if (utilisateur.role === "admin") {
      tousReservations();
    } else {
      getReservations();
    }
  }, []);

  function ajoutReservation() {
    axios
      .post(process.env.REACT_APP_URL + "/reservation", { nom })
      .then((reponse) => {
        getReservations();
        setOpen(false);
        setNom("");
      })
      .catch((erreur) => {});
  }

  function accepterReservation(reservation) {
    axios
      .put(process.env.REACT_APP_URL + "/reservation/" + reservation._id, {
        ...reservation,
        etat: "accepté",
      })
      .then((reponse) => {
        tousReservations();
      })
      .catch((erreur) => {});
  }

  function refuserReservation(reservation) {
    axios
      .put(process.env.REACT_APP_URL + "/reservation/" + reservation._id, {
        ...reservation,
        etat: "réfusé",
      })
      .then((reponse) => {
        tousReservations();
      })
      .catch((erreur) => {});
  }

  function restaurerReservation(reservation) {
    axios
      .put(process.env.REACT_APP_URL + "/reservation/" + reservation._id, {
        ...reservation,
        etat: "envoyé",
      })
      .then((reponse) => {
        tousReservations();
      })
      .catch((erreur) => {});
  }

  function listeProduits() {
    axios
      .get(process.env.REACT_APP_URL + "/produit")
      .then((reponse) => {
        setProduits(reponse.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {utilisateur.role === "admin" && (
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Ajouter Réservation
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Produit</TableCell>
              <TableCell>date_debut réservation</TableCell>
              <TableCell>date_fin réservation</TableCell>
              <TableCell>montant réservation</TableCell>
              <TableCell>etat réservation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {reservation.id_utilisateur.nom +
                    " " +
                    reservation.id_utilisateur.prenom}
                </TableCell>
                <TableCell component="th" scope="row">
                  {reservation.id_produit.nom}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(reservation.date_debut).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(reservation.date_fin).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {reservation.montant}
                </TableCell>
                <TableCell component="th" scope="row">
                  {reservation.etat}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent={"flex-end"}
                  >
                    {utilisateur.role === "admin" &&
                    reservation.etat == "envoyé" ? (
                      <>
                        <Button
                          onClick={() => {
                            accepterReservation(reservation);
                          }}
                          color="success"
                          variant="contained"
                        >
                          Accepter
                        </Button>
                        <Button
                          onClick={() => {
                            refuserReservation(reservation);
                          }}
                          color="error"
                          variant="contained"
                        >
                          Refuser
                        </Button>
                      </>
                    ) : (
                      utilisateur.role == "admin" && (
                        <Button
                          onClick={() => {
                            restaurerReservation(reservation);
                          }}
                        >
                          Restaurer
                        </Button>
                      )
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form>
            <Controller
              control={control}
              name="id_produit"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Produit
                    </InputLabel>
                    <Select
                      sx={{ width: "222.4px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Catégorie"
                      onChange={onChange}
                    >
                      {produits.map((categorie) => {
                        return (
                          <MenuItem value={categorie._id}>
                            {categorie.nom}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              }}
            />
            <Controller
              control={control}
              name="date_debut"
              render={({ field: { value, onChange } }) => {
                return (
                  <DatePicker
                    value={value}
                    label="Date de début"
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="date_fin"
              render={({ field: { value, onChange } }) => {
                return (
                  <DatePicker
                    label="Date de retour"
                    value={value}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                );
              }}
            />
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ListReservation;
