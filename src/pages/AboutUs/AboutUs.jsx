import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  color: "#333",
  padding: "60px 0",
  textAlign: "center",
});

const Feature = ({ icon, title, description }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <span
        style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}
      >
        {icon}
      </span>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: "1rem" }}
      >
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  </Grid>
);

const AboutUs = () => {
  return (
    <StyledBox style={{ background: "#f9f9f9" }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 4 }}>
          Bienvenue chez BABY-FASHION
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 6 }}>
          Chez BABY-FASHION, nous croyons en l'élégance sans effort et en la
          confiance que vous ressentez lorsque vous portez le vêtement parfait
          pour chaque occasion.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Feature
            icon="👗"
            title="Large sélection"
            description="Découvrez une large sélection de vêtements de haute qualité pour  enfants, adaptés à toutes les occasions."
          />
          <Feature
            icon="💼"
            title="Location facile"
            description="Notre processus de location simple et transparent vous permet de trouver et de réserver vos vêtements préférés en quelques clics seulement."
          />
        </Grid>
        <Button variant="contained" sx={{ marginTop: 6 }}>
          Découvrir nos collections
        </Button>
      </Container>
    </StyledBox>
  );
};

export default AboutUs;
