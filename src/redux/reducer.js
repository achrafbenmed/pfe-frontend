import actions from "./actions";

const valeurInitial = {
  utilisateur: JSON.parse(localStorage.getItem("utilisateur")) || null,
  error: "",
  success: "",
  panier: JSON.parse(localStorage.getItem("panier")) || [],
};

function reducer(state = valeurInitial, action) {
  switch (action.type) {
    case actions.inscrire:
      localStorage.setItem("utilisateur", JSON.stringify(action.utilisateur));
      localStorage.setItem("panier", JSON.stringify([]));
      return { ...state, utilisateur: action.utilisateur, panier: [] };
    case actions.seConnecter:
      localStorage.setItem("utilisateur", JSON.stringify(action.utilisateur));
      localStorage.setItem("panier", JSON.stringify([]));
      return { ...state, utilisateur: action.utilisateur, panier: [] };
    case actions.deconnecter:
      localStorage.setItem("utilisateur", null);
      localStorage.setItem("panier", JSON.stringify([]));
      return {
        ...state,
        utilisateur: null,
        panier: [],
      };
    case actions.error:
      return { ...state, error: action.error, success: "" };
    case actions.success:
      return { ...state, success: action.success, error: "" };

    case actions.addToCart:
      localStorage.setItem(
        "panier",
        JSON.stringify([...state.panier, action.item])
      );
      return {
        ...state,
        panier: [...state.panier, action.item],
      };

    case actions.removeFromCart:
      localStorage.setItem(
        "panier",
        JSON.stringify(
          state.panier.filter(
            (item) => item.produit._id !== action.item.produit._id
          )
        )
      );

      return {
        ...state,
        panier: state.panier.filter(
          (item) => item.produit._id !== action.item.produit._id
        ),
      };

    case actions.emptyCart:
      localStorage.setItem("panier", JSON.stringify([]));
      return { ...state, panier: [] };

    default:
      return state;
  }
}

export default reducer;
