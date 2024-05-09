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
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { frFR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Inscrire() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      cin: "",
      email: "",
      mdp: "",
      confirmation_mdp: "",
      tel: "",
      date_naissance: null,
      sexe: "",
    },
  });

  function inscrireAction(data) {
    if (data.mdp !== data.confirmation_mdp) {
      setError("confirmation_mdp", { message: "Vérifier votre message" });
    }

    axios
      .post(process.env.REACT_APP_URL + "/utilisateur", data)
      .then((reponse) => {
        dispatch({ type: actions.inscrire, utilisateur: reponse.data });
        navigate("/");
      })
      .catch((erreur) => {
        dispatch({ type: actions.error, error: erreur.message });
      });
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Stack
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography fontSize={35} textAlign={"center"} fontWeight={900}>
          S'inscrire
        </Typography>
        <form onSubmit={handleSubmit(inscrireAction)}>
          <Stack
            width={700}
            p={"50px"}
            bgcolor={"#735f5f26"}
            flexDirection={"row"}
            borderRadius={3}
            justifyContent={"space-between"}
          >
            <Stack direction={"column"} width={"45%"} spacing={3}>
              <Controller
                name="prenom"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      required
                      label="Prénom"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  );
                }}
              />
              <Controller
                name="nom"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      required
                      label="Nom"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  );
                }}
              />
              <Controller
                name="cin"
                control={control}
                rules={{
                  minLength: { value: 8, message: "doit contenir 8 chiffres" },
                  maxLength: { value: 8, message: "doit contenir 8 chiffres" },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      required
                      label="Num CIN"
                      type="number"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  );
                }}
              />
              <Controller
                name="date_naissance"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      format="DD/MM/YYYY"
                    />
                  );
                }}
              />
              <Controller
                name="sexe"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Sexe
                      </FormLabel>
                      <RadioGroup
                        value={value}
                        onChange={onChange}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="femme"
                          control={<Radio />}
                          label="Femme"
                        />
                        <FormControlLabel
                          value="homme"
                          control={<Radio />}
                          label="Homme"
                        />
                      </RadioGroup>
                    </FormControl>
                  );
                }}
              />
            </Stack>
            <Stack direction={"column"} width={"45%"} spacing={3}>
              <Controller
                name="tel"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      required
                      type="number"
                      label="Num Tel"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error && error.message}
                    />
                  );
                }}
              />
              <Controller
                name="email"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      required
                      type="email"
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
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
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
              <Controller
                name="confirmation_mdp"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Confirmation Mot de passe"
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
            </Stack>
          </Stack>
        </form>
      </Stack>
    </LocalizationProvider>
  );
}
