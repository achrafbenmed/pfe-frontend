import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions";

export default function Se_Connecter() {
  const dispatch = useDispatch();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      email: "",
      mdp: "",
    },
  });

  function connectAction(data) {
    axios
      .post(process.env.REACT_APP_URL + "/utilisateur/connecter", data)
      .then((reponse) => {
        console.log(reponse.data);
        dispatch({ type: actions.seConnecter, utilisateur: reponse.data });
      })
      .catch((erreur) => {
        console.log(erreur.message);
      });
  }

  return (
    <Stack>
      <Typography>Se Connecter</Typography>
      <form onSubmit={handleSubmit(connectAction)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                label="Email"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error && error.message}
              />
            );
          }}
        />
        <Controller
          name="mdp"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <TextField
                required
                label="Mot de passe"
                type="password"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error && error.message}
              />
            );
          }}
        />
        <Button type="submit" variant="contained" color="success">
          Success
        </Button>
      </form>
    </Stack>
  );
}
