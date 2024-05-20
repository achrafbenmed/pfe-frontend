import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import actions from "../../redux/actions";

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
  const [collapse, setCollapse] = useState("");
  const [produits, setProduits] = useState([]);
  const dispatch = useDispatch();
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      date_debut: null,
      date_fin: null,
      produit: null,
      qte: 0,
    },
  });

  function tousReservations() {
    axios
      .get(process.env.REACT_APP_URL + "/reservation/getAll")
      .then((reponse) => {
        console.log(reponse.data);
        setCategories(reponse.data);
      })
      .catch((erreur) =>
        dispatch({ type: actions.error, error: erreur.message })
      );
  }

  function getReservations() {
    axios
      .get(process.env.REACT_APP_URL + "/reservation")
      .then((reponse) => {
        console.log(reponse.data);
        setCategories(reponse.data);
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  useEffect(() => {
    listeProduits();
    if (utilisateur.role === "admin") {
      tousReservations();
    } else {
      getReservations();
    }
  }, []);

  function ajoutReservation(data) {
    const { produit, date_debut, date_fin, qte } = data;
    const montant =
      parseInt(qte) *
      produit.montant *
      (dayjs(date_fin).diff(date_debut, "days") + 1);

    axios
      .post(process.env.REACT_APP_URL + "/reservation", {
        id_utilisateur: utilisateur._id,
        montantTotal: montant,
        items: [{ produit: produit._id, date_debut, date_fin, montant, qte }],
      })
      .then((reponse) => {
        getReservations();
        setOpen(false);
        reset();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
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
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
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
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
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
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function annulerReservation(reservation) {
    axios
      .put(process.env.REACT_APP_URL + "/reservation/" + reservation._id, {
        ...reservation,
        etat: "annulé",
      })
      .then((reponse) => {
        tousReservations();
        dispatch({ type: actions.error, error: "Réservation annulé" });
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
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
              <TableCell></TableCell>
              <TableCell>CODE réservation</TableCell>
              <TableCell>date réservation</TableCell>
              <TableCell>montant réservation</TableCell>
              <TableCell>etat réservation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setCollapse(collapse == "" ? reservation._id : "")
                      }
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {reservation._id}
                  </TableCell>
                  <TableCell>
                    {dayjs(reservation.cree_le).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>{reservation.montantTotal}</TableCell>
                  <TableCell>{reservation.etat}</TableCell>
                  <TableCell align="right">
                    {reservation.etat == "envoyé" && (
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
                    )}
                    {reservation.etat === "réfusé" ||
                      (reservation.id_utilisateur._id === utilisateur._id &&
                        reservation.etat === "annulé" && (
                          <Button
                            onClick={() => {
                              restaurerReservation(reservation);
                            }}
                          >
                            Restaurer
                          </Button>
                        ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={collapse === reservation._id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Produits
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Produit</TableCell>
                              <TableCell>Date Début</TableCell>
                              <TableCell>Date Retour</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell align="right">
                                Total price ($)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {reservation.items.map((item) => (
                              <TableRow key={item.date}>
                                <TableCell align="left">
                                  <Typography>{item.produit.nom}</Typography>
                                  <img
                                    height={60}
                                    src={
                                      "http://localhost:5000/images/" +
                                      item.produit.image
                                    }
                                  />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {dayjs(item.date_debut).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell>
                                  {dayjs(item.date_fin).format("DD/MM/YYYY")}
                                </TableCell>

                                <TableCell align="right">{item.qte}</TableCell>
                                <TableCell align="right">
                                  {item.montant}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(ajoutReservation)}>
            <Controller
              control={control}
              name="produit"
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
                      label="Produit"
                      onChange={onChange}
                      renderValue={(value) => value.nom}
                    >
                      {produits.map((produit) => {
                        return (
                          <MenuItem value={produit}>{produit.nom}</MenuItem>
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
                    minDate={dayjs()}
                    maxDate={watch("date_fin")}
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
                    minDate={watch("date_debut")}
                    label="Date de retour"
                    value={value}
                    onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="qte"
              rules={{
                max: {
                  value: watch("produit") ? watch("produit").qte : 0,
                  message: `Quantité maximale est ${
                    watch("produit") ? watch("produit").qte : 1
                  }`,
                },
                min: { value: 1, message: "Quantité minimale est 1" },
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Quantité"
                    error={!!error}
                    helperText={error && error.message}
                  />
                );
              }}
            />
            <Button type="submit">Ajouter une commande</Button>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ListReservation;
