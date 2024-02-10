import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expensesService";
import { RootState } from "../index";

interface AuthState {
  expenses: any;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthState = {
  expenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new expense
export const createExpense = createAsyncThunk(
  "expenses/create",
  async (expenseData: any, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.createExpense(expenseData, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user expenses
export const getExpenses = createAsyncThunk(
  "expenses/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.getExpenses(token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user expenses
export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id: number, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await expenseService.deleteExpense(id, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gaolSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    expensesReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("-------------");
        console.log(action.payload.id);
        state.expenses = state.expenses.filter(
          (expense: any) => expense._id !== action.payload.id
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { expensesReset } = gaolSlice.actions;

export const expensesSelector = (state: RootState) => {
  return state.expenses;
};

export default gaolSlice.reducer;
