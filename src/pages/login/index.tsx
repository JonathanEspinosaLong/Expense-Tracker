import Container from "@/components/atoms/Container";
import Header from "@/components/atoms/Header";
import TextBox from "@/components/atoms/TextBox";
import Navbar from "@/components/molecules/Navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { authSelector, login, reset } from "@/store/auth/authSlice";
import { Login } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <Container>
      <Navbar />
      <section className="heading">
        <Header
          title="Login"
          subtitle="Login and start setting goals"
          icon={<Login sx={{ fontSize: "inherit", marginRight: "16px" }} />}
        />
      </section>
      <section className="form">
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

export default LoginPage;

export interface FormData {
  email: string;
  password: string;
}
