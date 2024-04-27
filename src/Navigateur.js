import { Route, Routes } from "react-router-dom";
import Inscrire from "./pages/Inscrire/Inscrire";
import NavBar from "./components/NavBar/NavBar";
import Se_Connecter from "./pages/Se_connecter/Se_connecter";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import AjoutProduit from "./pages/AjoutProduit/AjoutProduit";
import ModifierProduit from "./pages/ModifierProduit/ModifierProduit";
import ListCategories from "./pages/ListCategories/ListCategories";
import ListUser from "./pages/ListUser/ListUser";
import ListReservation from "./pages/ListReservation/ListReservation";

function Navigateur() {
  const utilisateur = useSelector((state) => state.utilisateur);
  return (
    <>
      <NavBar />

      {utilisateur ? (
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/ajout_produit" Component={AjoutProduit} />
          <Route path="/produit/:id" Component={ModifierProduit} />
          <Route path="/categorie" Component={ListCategories} />
          <Route path="/utilisateurs" Component={ListUser} />
          <Route path="/reservations" Component={ListReservation} />

          <Route
            path="*"
            Component={() => {
              return 404;
            }}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" Component={Se_Connecter} />
          <Route path="/inscrire" Component={Inscrire} />
          <Route path="/connecter" Component={Se_Connecter} />
        </Routes>
      )}
    </>
  );
}

export default Navigateur;
