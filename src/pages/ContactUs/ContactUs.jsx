import { Stack, Typography } from "@mui/material";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <Typography
        textAlign={"center"}
        fontSize={26}
        fontWeight={900}
        marginTop={7}
      >
        Contacter Nous
      </Typography>
      <Stack direction={"row"} sx={{ marginTop: 20 }} spacing={2}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10579.16107992883!2d10.091276469307411!3d33.88160205448069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556fbba0f54ebd%3A0x94ae80792469630e!2sCamp%20Militaire%2C%20Gab%C3%A8s!5e0!3m2!1sfr!2stn!4v1715476203514!5m2!1sfr!2stn"
          width="800"
          height="600"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <Stack spacing={2}>
          <Typography textAlign={"left"}>Tel : </Typography>
          <Typography textAlign={"left"}>
            E-mail :<a href="mailto:email">email</a>
          </Typography>
          <Typography textAlign={"left"}>Adresse : </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ContactUs;
