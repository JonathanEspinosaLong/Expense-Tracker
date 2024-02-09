import Container from "@/components/atoms/Container";
import Header from "@/components/atoms/Header";
import TextBox from "@/components/atoms/TextBox";
import Navbar from "@/components/molecules/Navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { authSelector, register, reset } from "@/store/auth/authSlice";
import { Person } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } =
    useAppSelector(authSelector);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      router.push("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== password2) toast.error("Passwords do not match");
    else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <Container>
      <Navbar />
      <section className="heading">
        <Header
          title="Register"
          subtitle="Please create an account"
          icon={<Person sx={{ fontSize: "inherit", marginRight: "16px" }} />}
        />
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
        <Button
          variant="contained"
          sx={{ width: "100%", height: "52px" }}
          onClick={onSubmit}
        >
          {isLoading ? <CircularProgress sx={{ color: "white" }} /> : "Submit"}
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
