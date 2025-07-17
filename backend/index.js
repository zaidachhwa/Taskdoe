const express = require("express");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/user.routes");
const { checkAuth } = require("./middlewares/auth.middleware");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

// middleware
app.use(
  cors({
    origin: "https://taskdoe.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

// Routes

app.use("/todos", checkAuth, todoRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
