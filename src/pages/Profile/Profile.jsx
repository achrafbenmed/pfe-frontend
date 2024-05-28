import { Button } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const navigate = useNavigate();
  const { utilisateur } = useSelector((state) => state);
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <p>
          <span>Nom:</span> {utilisateur.nom}
        </p>
        <p>
          <span>Prénom:</span> {utilisateur.prenom}
        </p>
        <p>
          <span>Email:</span> {utilisateur.email}
        </p>
        <p>
          <span>CIN:</span> {utilisateur.cin}
        </p>
        <p>
          <span>Date de naissance:</span>{" "}
          {dayjs(utilisateur.date_naissance).format("DD / MM / YYYY")}
        </p>
        <p>
          <span>Sexe:</span> {utilisateur.sexe}
        </p>
        <p>
          <span>Rôle:</span> {utilisateur.role}
        </p>
      </div>
      <div className="profile-button">
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
