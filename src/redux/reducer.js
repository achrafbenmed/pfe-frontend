import actions from "./actions";

const valeurInitial = {
  utilisateur: JSON.parse(localStorage.getItem("utilisateur")) || null,
};

function reducer(state = valeurInitial, action) {
  switch (action.type) {
    case actions.inscrire:
      localStorage.setItem("utilisateur", JSON.stringify(action.utilisateur));
      return { ...state, utilisateur: action.utilisateur };
    case actions.seConnecter:
      localStorage.setItem("utilisateur", JSON.stringify(action.utilisateur));
      return { ...state, utilisateur: action.utilisateur };
    case actions.deconnecter:
      localStorage.setItem("utilisateur", null);
      return { ...state, utilisateur: null };

    default:
      return state;
  }
}

export default reducer;
