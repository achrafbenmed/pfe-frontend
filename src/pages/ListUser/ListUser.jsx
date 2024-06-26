import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
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
const ListUser = () => {
  const utilisateur = useSelector((state) => state.utilisateur);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Restaurer(id) {
    axios
      .put(process.env.REACT_APP_URL + "/utilisateur/restore/" + id)
      .then((reponse) => {
        tousUtilisateurs();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function tousUtilisateurs() {
    axios
      .get(process.env.REACT_APP_URL + "/utilisateur/getAll")
      .then((reponse) => {
        setUtilisateurs(reponse.data);
      })
      .catch((erreur) =>
        dispatch({ type: actions.error, error: erreur.message })
      );
  }
  function getUtilisateurs() {
    axios
      .get(process.env.REACT_APP_URL + "/utilisateur")
      .then((reponse) => {
        setUtilisateurs(reponse.data);
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function supprimer(id) {
    axios
      .delete(process.env.REACT_APP_URL + "/utilisateur/" + id)
      .then((reponse) => {
        tousUtilisateurs();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  useEffect(() => {
    if (utilisateur.role === "admin") {
      tousUtilisateurs();
    } else {
      getUtilisateurs();
    }
  }, []);

  function clickAjouterUtilisateur() {
    axios
      .post(process.env.REACT_APP_URL + "/categorie", {})
      .then((reponse) => {
        getUtilisateurs();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function clickModifierUtilisateur(id) {
    axios
      .put(process.env.REACT_APP_URL + "/categorie/" + id, {})
      .then((reponse) => {})
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  return (
    <>
      {utilisateur.role === "admin" && (
        <Button
          onClick={() => {
            navigate("/ajout_utilisateur");
          }}
        >
          Ajouter Utilisateur
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                th: {
                  fontWeight: 900,
                  fontSize: 16,
                  background: "#272727eb",
                  color: "#fff",
                },
              }}
            >
              <TableCell component="th">cin </TableCell>
              <TableCell component="th">prenom </TableCell>
              <TableCell component="th">Nom </TableCell>
              <TableCell component="th">email </TableCell>
              <TableCell component="th">role</TableCell>
              <TableCell component="th">tel </TableCell>
              <TableCell component="th">date naissance </TableCell>
              <TableCell component="th">sexe </TableCell>

              <TableCell align="center" component="th">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurs.map((item) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  th: {
                    fontWeight:
                      item.role === "admin" ? "800 !important" : "normal",
                  },
                  background: item.role === "admin" ? "#83e8f085" : "",
                }}
              >
                <TableCell component="th" scope="row">
                  {item.cin}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.prenom}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.nom}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.role}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.tel}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(item.date_naissance).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.sexe}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent={"flex-end"}
                  >
                    {utilisateur.role === "admin" && item.supprime == false ? (
                      <>
                        <Button
                          onClick={() => {
                            navigate("/modifier_utilisateur", {
                              state: {
                                utilisateur: item,
                                path: "/utilisateurs",
                              },
                            });
                          }}
                          color="warning"
                          variant="contained"
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={() => {
                            supprimer(item._id);
                          }}
                          color="error"
                          variant="contained"
                        >
                          Supprimer
                        </Button>
                      </>
                    ) : (
                      utilisateur.role === "admin" &&
                      item.supprime && (
                        <Button
                          onClick={() => {
                            Restaurer(item._id);
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
    </>
  );
};

export default ListUser;
