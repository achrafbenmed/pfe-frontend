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

  useEffect(() => {
    if (panier.length === 0) {
      setTotal(0);
    } else {
      let t = 0;
      panier.forEach((p) => {
        t += p.montant;
      });
      setTotal(t);
    }
  }, [panier]);

  const confirmerReservation = () => {
    axios
      .post(process.env.REACT_APP_URL + "/reservation", {
        montantTotal: total,
        id_utilisateur: utilisateur._id,
        items: panier,
      })
      .then(() => {
        dispatch({ type: actions.emptyCart });
        dispatch({
          type: actions.success,
          success: "Réservation confirmée",
        });
      })
      .catch((error) => {
        dispatch({ type: actions.error, error: error.response.data });
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Panier
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Produit</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Date Début Réservation
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Date Fin Réservation
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Montant Réservation
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {panier.map((reservation) => (
              <TableRow
                key={reservation._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">
                    {reservation.produit.nom}
                  </Typography>
                  <img
                    height={60}
                    src={`http://localhost:5000/images/${reservation.produit.image}`}
                    alt={reservation.produit.nom}
                    style={{ marginTop: "10px", borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>
                  {dayjs(reservation.date_debut).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(reservation.date_fin).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>{reservation.montant} TND</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
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
      <Typography variant="h6" sx={{ textAlign: "right", mb: 3 }}>
        Montant Total: {total} TND
      </Typography>
      {panier.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={confirmerReservation}
          sx={{ display: "block", margin: "0 auto", fontWeight: "bold" }}
        >
          Confirmer Commande
        </Button>
      )}
    </div>
  );
};

export default Panier;
