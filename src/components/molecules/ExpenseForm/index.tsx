import { useAppDispatch, useAppSelector } from "@/hooks/store";
import React, { useState } from "react";
import TextBox from "../../atoms/TextBox";
import { Button, CircularProgress } from "@mui/material";
import {
  expensesSelector,
  createExpense,
} from "@/store/expenses/expensesSlice";

function ExpenseForm() {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const { expenses, isLoading, isError, isSuccess, message } =
    useAppSelector(expensesSelector);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createExpense({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">
            Expense (Represented with the general currency symbol - ¤)
          </label>
          <TextBox
            name="text"
            id="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="number"
          />
        </div>
        <div className="form-group">
          <Button variant="contained" sx={{ width: "100%" }} type="submit">
            Add Expense
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
