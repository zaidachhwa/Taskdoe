const express = require("express");
const {
  getTodo,
  getAllTodos,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  handleTodoStats,
} = require("../controllers/todo.controller");
const { checkAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// Get Routes

router.get("/:id", getTodo);
router.get("/", getAllTodos);
router.get("/check/stats", handleTodoStats);

// Post Routes
router.post("/create", createTodo);

// Update Routes
router.put("/update/:id", updateTodo);
router.put("/update-status/:id", updateTodoStatus);

// Delete Routes
router.delete("/delete/:id", deleteTodo);

module.exports = router;
