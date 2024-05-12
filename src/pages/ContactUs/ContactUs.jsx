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
      <Stack direction={"row"} sx={{ marginTop: 13 }} spacing={2}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d828.092517832784!2d10.091896545727602!3d33.88012171694626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDUyJzQ2LjAiTiAxMMKwMDUnMzEuOSJF!5e0!3m2!1sen!2stn!4v1715517197983!5m2!1sen!2stn"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <Stack spacing={2}>
          <Typography textAlign={"left"}>Tel : 22036176</Typography>
          <Typography textAlign={"left"}>
            E-mail :
            <a href="mailto:achrafbenmohamed99@gmail.com">
              achrafbenmohamed99@gmail.com
            </a>
          </Typography>
          <Typography textAlign={"left"}>
            Adresse : Avenue Béchir El Jaziri - شارع البشير الجزيري, Gabès 6000
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ContactUs;
