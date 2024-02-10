const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config({ path: ".env.local" });
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middle that parses incoming requests with JSON payloads
app.use(express.json());
// Middleware that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

app.use("/api/expenses", require("./routes/expensesRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
