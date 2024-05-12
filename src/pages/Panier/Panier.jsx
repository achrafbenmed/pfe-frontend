import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import axios from "axios";

const Panier = () => {
  const dispatch = useDispatch();
  const { panier, utilisateur } = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  let t = 0;

  useEffect(() => {
    panier.length === 0
      ? setTotal(0)
      : panier.map((p) => {
          t += p.montant;
          setTotal(t);
        });
  }, [panier]);

  const confirmerReservation = () => {
    console.log({
      id_utilisateur: utilisateur._id,
      items: panier,
    });
    axios
      .post(process.env.REACT_APP_URL + "/reservation", {
        montantTotal: total,
        id_utilisateur: utilisateur._id,
        items: panier,
      })
      .then((response) => {
        dispatch({ type: actions.emptyCart });
        dispatch({
          type: actions.success,
          success: "Réservation confirmée",
        });
      });
  };
  return (
    <div>
      <div>
        <Typography>Panier</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell>date_debut réservation</TableCell>
                <TableCell>date_fin réservation</TableCell>
                <TableCell>montant réservation</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {panier.map((reservation) => (
                <TableRow
                  key={reservation._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography>{reservation.produit.nom}</Typography>
                    <img
                      height={60}
                      src={
                        "http://localhost:5000/images/" +
                        reservation.produit.image
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

                  <TableCell align="right" component="th" scope="row">
                    <Stack
                      direction={"row"}
                      spacing={3}
                      justifyContent={"flex-end"}
                    >
                      <Button
                        onClick={() => {
                          dispatch({
                            type: actions.removeFromCart,
                            item: reservation,
                          });
                        }}
                        color="error"
                        variant="contained"
                      >
                        Annuler
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography textAlign={"right"} px={15}>
          Montant Total: {total} <small>TND</small>
        </Typography>
        {panier.length > 0 && (
          <Button
            onClick={() => {
              confirmerReservation();
            }}
          >
            Confirmer Commande
          </Button>
        )}
      </div>
    </div>
  );
};

export default Panier;
