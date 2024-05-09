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
export default function ListCategories() {
  const utilisateur = useSelector((state) => state.utilisateur);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("ajout");
  const [nom, setNom] = useState("");
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  function Restaurer(id) {
    axios
      .put(process.env.REACT_APP_URL + "/categorie/restore/" + id)
      .then((reponse) => {
        tousCategorie();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function tousCategorie() {
    axios
      .get(process.env.REACT_APP_URL + "/categorie/getAll")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) =>
        dispatch({ type: actions.error, error: erreur.message })
      );
  }
  function getCategories() {
    axios
      .get(process.env.REACT_APP_URL + "/categorie")
      .then((reponse) => {
        setCategories(reponse.data);
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function supprimer(id) {
    axios
      .delete(process.env.REACT_APP_URL + "/categorie/" + id)
      .then((reponse) => {
        tousCategorie();
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  useEffect(() => {
    if (utilisateur.role === "admin") {
      tousCategorie();
    } else {
      getCategories();
    }
  }, []);

  function ajoutCategorie() {
    axios
      .post(process.env.REACT_APP_URL + "/categorie", { nom })
      .then((reponse) => {
        getCategories();
        setOpen(false);
        setNom("");
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  function modifierCategorie(id) {
    axios
      .put(process.env.REACT_APP_URL + "/categorie/" + id, { nom })
      .then((reponse) => {
        getCategories();
        setOpen(false);
        setNom("");
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  return (
    <>
      {utilisateur.role === "admin" && (
        <Button
          onClick={() => {
            setOpen(true);
            setTypeForm("ajout");
            setNom("");
          }}
        >
          Ajouter catégorie
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom catégorie</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((categorie) => (
              <TableRow
                key={categorie._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {categorie.nom}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent={"flex-end"}
                  >
                    {utilisateur.role === "admin" && (
                      <>
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setTypeForm("modifier");
                            setNom(categorie.nom);
                            setId(categorie._id);
                          }}
                          color="warning"
                          variant="contained"
                        >
                          Modifier
                        </Button>
                        <Button
                          onClick={() => {
                            supprimer(categorie._id);
                          }}
                          color="error"
                          variant="contained"
                        >
                          Supprimer
                        </Button>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              typeForm == "ajout" ? ajoutCategorie() : modifierCategorie(id);
            }}
          >
            <TextField
              label="Nom du catégorie"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            {typeForm == "ajout" ? (
              <Button type="submit" variant="contained" color="success">
                Ajouter Catégorie
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="warning">
                Modifier Catégorie
              </Button>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
}
