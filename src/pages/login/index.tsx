import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";
import TextBox from "@/components/atoms/TextBox";
import Navbar from "@/components/molecules/Navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { authSelector, login, authReset } from "@/store/auth/authSlice";
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

    dispatch(authReset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <Heading
        title="Login"
        subtitle="Login and start setting expenses"
        icon={<Login sx={{ fontSize: "inherit", marginRight: "16px" }} />}
      />
      <section className="form">
        <form onSubmit={onSubmit}>
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
            type="submit"
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </section>
    </Container>
  );
}

export default LoginPage;

export interface FormData {
  email: string;
  password: string;
}
