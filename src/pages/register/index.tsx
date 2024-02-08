import Container from "@/components/atoms/Container";
import TextBox from "@/components/atoms/TextBox";
import Header from "@/components/molecules/Header";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <Header />
      <section className="heading">
        <h1>
          <Person sx={{ fontSize: "inherit" }} />
          Register
        </h1>
      </section>
      <section className="form">
        <div className="form-group">
          <TextBox
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          ></TextBox>
        </div>
        <div className="form-group">
          <TextBox
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
            type="email"
          ></TextBox>
        </div>
        <div className="form-group">
          <TextBox
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
            type="password"
          ></TextBox>
        </div>
        <div className="form-group">
          <TextBox
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
            type="password"
          ></TextBox>
        </div>
        <Button variant="contained" sx={{ width: "100%" }}>
          Submit
        </Button>
      </section>
    </Container>
  );
}

export default Register;

export interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}
