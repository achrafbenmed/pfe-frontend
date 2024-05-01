import { Button } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { utilisateur } = useSelector((state) => state);
  return (
    <div>
      <h1>Profile</h1>
      <div>
        Informations Personelle:
        <p>{`nom : ${utilisateur.nom}`}</p>
        <p>{`prenom : ${utilisateur.prenom}`}</p>
        <p>{`email : ${utilisateur.email}`}</p>
        <p>{`cin : ${utilisateur.cin}`}</p>
        <p>{`date de naissance : ${dayjs(utilisateur.date_naissance).format(
          "DD / MM / YYYY"
        )}`}</p>
        <p>{`sexe : ${utilisateur.sexe}`}</p>
        <p>{`role : ${utilisateur.role}`}</p>
        <Button
          color="warning"
          variant="contained"
          onClick={() => {
            navigate("/modifier_utilisateur", {
              state: { utilisateur, path: "/profile" },
            });
          }}
        >
          Modifier Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
