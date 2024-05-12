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
  IconButton,
  Collapse,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MesReservations = () => {
  const [open, setOpen] = useState("");

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
              <TableCell></TableCell>
              <TableCell>CODE de réservation</TableCell>
              <TableCell>date réservation</TableCell>
              <TableCell>montant réservation</TableCell>
              <TableCell>etat réservation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => {
              return (
                // <TableRow>
                //   {reservation.items.map((item) => {
                //     return (
                //       <TableRow
                //         key={reservation._id}
                //         sx={{
                //           "&:last-child td, &:last-child th": { border: 0 },
                //         }}
                //       >
                //         <TableCell component="th" scope="row">
                //           <Typography>{item.produit.nom}</Typography>
                //           <img
                //             height={60}
                //             src={
                //               "http://localhost:5000/images/" +
                //               item.produit.image
                //             }
                //           />
                //         </TableCell>
                //         <TableCell component="th" scope="row">
                //           {dayjs(reservation.date_debut).format("DD-MM-YYYY")}
                //         </TableCell>
                //         <TableCell component="th" scope="row">
                //           {dayjs(reservation.date_fin).format("DD-MM-YYYY")}
                //         </TableCell>
                //         <TableCell component="th" scope="row">
                //           {reservation.montant}
                //         </TableCell>
                //         <TableCell component="th" scope="row">
                //           {reservation.etat}
                //         </TableCell>
                //         <TableCell align="right" component="th" scope="row">
                //           <Stack
                //             direction={"row"}
                //             spacing={3}
                //             justifyContent={"flex-end"}
                //           >
                //             {reservation.etat == "envoyé" && (
                //               <Button
                //                 onClick={() => {
                //                   annulerReservation(reservation);
                //                 }}
                //                 color="error"
                //                 variant="contained"
                //               >
                //                 Annuler
                //               </Button>
                //             )}
                //           </Stack>
                //         </TableCell>
                //       </TableRow>
                //     );
                //   })}
                // </TableRow>
                <>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() =>
                          setOpen(open == "" ? reservation._id : "")
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
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={open === reservation._id}
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
                                    {dayjs(item.date_debut).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {dayjs(item.date_fin).format("DD/MM/YYYY")}
                                  </TableCell>

                                  <TableCell align="right">
                                    {item.qte}
                                  </TableCell>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MesReservations;
