import {
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  TableBody,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";

const MesReservations = () => {
  const utilisateur = useSelector((state) => state.utilisateur);
  const dispatch = useDispatch();
  const [reservations, setRéservations] = useState([]);
  const getReservationByUser = async () => {
    axios
      .get(
        process.env.REACT_APP_URL + "/reservation/getByUser/" + utilisateur._id
      )
      .then((response) => setRéservations(response.data));
  };
  useEffect(() => {
    getReservationByUser();
  }, []);

  function annulerReservation(reservation) {
    axios
      .put(process.env.REACT_APP_URL + "/reservation/" + reservation._id, {
        ...reservation,
        etat: "annulé",
      })
      .then((reponse) => {
        getReservationByUser();
        dispatch({ type: actions.error, error: "Réservation annulé" });
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }
  return (
    <div>
      <Typography>Mes Réservations</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                  <Typography>{reservation.id_produit.nom}</Typography>
                  <img
                    height={60}
                    src={
                      "http://localhost:5000/images/" +
                      reservation.id_produit.image
                    }
                  />
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
                    {reservation.etat == "envoyé" && (
                      <Button
                        onClick={() => {
                          annulerReservation(reservation);
                        }}
                        color="error"
                        variant="contained"
                      >
                        Annuler
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MesReservations;
