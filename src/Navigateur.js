import { Route, Routes } from "react-router-dom";
import Inscrire from "./pages/Inscrire/Inscrire";
import NavBar from "./components/NavBar/NavBar";
import Se_Connecter from "./pages/Se_connecter/Se_connecter";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import AjoutProduit from "./pages/AjoutProduit/AjoutProduit";
import ModifierProduit from "./pages/ModifierProduit/ModifierProduit";
import ListCategories from "./pages/ListCategories/ListCategories";
import ListUser from "./pages/ListUser/ListUser";
import ListReservation from "./pages/ListReservation/ListReservation";
import AjoutUtilisateur from "./pages/AjoutUtilisateur/AjoutUtilisateur";
import ModifierUtilisateur from "./pages/ModifierUtilisateur/ModifierUtilisateur";
import Profile from "./pages/Profile/Profile";
import ProduitInfo from "./pages/ProduitInfo/ProduitInfo";
import { Alert, Snackbar } from "@mui/material";
import actions from "./redux/actions";
import MesReservations from "./pages/MesReservations/MesReservations";

function Navigateur() {
  const { utilisateur, error, success } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <NavBar />
      <Snackbar open={error !== ""} autoHideDuration={5000}>
        <Alert
          onClose={() => {
            dispatch({ type: actions.error, error: "" });
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success !== ""} autoHideDuration={5000}>
        <Alert
          onClose={() => {
            dispatch({ type: actions.success, success: "" });
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>

      {utilisateur ? (
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/ajout_produit" Component={AjoutProduit} />
          <Route path="/produit" Component={ProduitInfo} />
          <Route path="/produit/:id" Component={ModifierProduit} />
          <Route path="/categorie" Component={ListCategories} />
          <Route path="/utilisateurs" Component={ListUser} />
          <Route path="/ajout_utilisateur" Component={AjoutUtilisateur} />
          <Route path="/modifier_utilisateur" Component={ModifierUtilisateur} />
          <Route path="/reservations" Component={ListReservation} />
          <Route path="/profile" Component={Profile} />
          <Route path="/mes_reservations" Component={MesReservations} />

          <Route
            path="*"
            Component={() => {
              return 404;
            }}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/inscrire" Component={Inscrire} />
          <Route path="/connecter" Component={Se_Connecter} />
        </Routes>
      )}
    </>
  );
}

export default Navigateur;
