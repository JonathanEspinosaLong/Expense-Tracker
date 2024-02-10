import React from "react";
import { useAppDispatch } from "@/hooks/store";
import { IconButton } from "@mui/material";
import { deleteExpense } from "@store/expenses/expensesSlice";

function ExpenseItem({ expense }: ExpenseItemProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="expense">
      <div>{new Date(expense.createdAt).toLocaleString("en-US")}</div>
      <h2>¤{expense.text}</h2>
      <IconButton
        onClick={() => dispatch(deleteExpense(expense._id))}
        className="close"
        color="error"
        sx={{ width: "30px", height: "30px" }}
      >
        X
      </IconButton>
    </div>
  );
}

export interface ExpenseItemProps {
  expense: any;
}

export default ExpenseItem;
