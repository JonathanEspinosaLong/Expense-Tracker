import axios from "axios";

const API_URL = "/api/expenses/";

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, expenseData, config);

  return response.data;
};

// Create new expense
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete expense
const deleteExpense = async (expenseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(expenseId);
  const response = await axios.delete(API_URL + expenseId, config);

  return response.data;
};

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
};

export default expenseService;
