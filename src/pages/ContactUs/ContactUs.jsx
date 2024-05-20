import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactUs.css";

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data submitted:", values);
    alert("Form submitted successfully");
    resetForm();
  };

  return (
    <div className="contact-us">
      <header className="contact-us-header">
        <h1>Contact Us</h1>
      </header>
      <div className="contact-us-container">
        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.3131170200472!2d10.089570975508927!3d33.88158887322187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556fcfdd67dc3b%3A0x9e92944bab800b09!2zQXZlbnVlIELDqWNoaXIgRWwgSmF6aXJpIC0g2LTYp9ix2Lkg2KfZhNio2LTZitixINin2YTYrNiy2YrYsdmKLCBHYWJlcw!5e0!3m2!1sfr!2stn!4v1716161288889!5m2!1sfr!2stn"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-form">
          <h2>Contact Information</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <Field type="text" id="subject" name="subject" />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <Field as="textarea" id="message" name="message" />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
