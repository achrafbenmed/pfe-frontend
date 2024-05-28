import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  getInitColorSchemeScript,
} from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Block } from "@mui/icons-material";

export default function Se_Connecter() {
  const navigate = useNavigate();
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
        dispatch({ type: actions.seConnecter, utilisateur: reponse.data });
        navigate("/");
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.response.data });
      });
  }

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={handleSubmit(connectAction)}>
        <Stack
          width={500}
          p={"50px"}
          bgcolor={"#735f5f26"}
          flexDirection={"column"}
          borderRadius={3}
          spacing={3}
        >
          <Typography
            fontSize={"20px"}
            lineHeight={"28px"}
            color="#03053e"
            textAlign={"center"}
            fontWeight={"800"}
            letterSpacing={"0.5em"}
            fontFamily={"Generic, sans - serif"}
            justifySelf={"center"}
          >
            SE CONNECTER
          </Typography>

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
            Se Connecter
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
