import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled(Box)({
  background: "linear-gradient(135deg, #1976d2, #feb47b)",
  color: "#fff",
  padding: "40px 0",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            BABY-FASHION
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Adresse : [Avenue Béchir El Jaziri - شارع البشير الجزيري, Gabès
            6000]
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Téléphone : [22036176]
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Email :{" "}
            <Link href="mailto:contact@example.com">babyfashion@gmail.com</Link>
          </Typography>
        </div>
        <Typography variant="body2">
          © {new Date().getFullYear()} [Baby-fashion]. Tous droits réservés.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
