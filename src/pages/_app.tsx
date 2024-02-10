import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
          <Component router={router} {...pageProps} />
        </Provider>
      </React.StrictMode>
      <ToastContainer />
    </>
  );
}
