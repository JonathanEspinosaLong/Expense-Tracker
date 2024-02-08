import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

function TextBox(props: TextFieldProps) {
  return <TextField {...props} sx={{ width: "100%" }}></TextField>;
}

export default TextBox;
