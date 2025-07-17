const pool = require("../database/db");

async function createTodo(req, res) {
  try {
    const { description } = req.body;

    const { user_id } = req.user;

    const newTodo = await pool.query(
      "INSERT INTO todo (description , user_id) VALUES($1 , $2) RETURNING *",
      [description, user_id]
    );

    res.json({ data: newTodo.rows[0], message: "Todo created successfully." });
  } catch (error) {
    console.log(error);
  }
}

async function getAllTodos(req, res) {
  try {
    const { user_id } = req.user;

    const allTodos = await pool.query(
      "SELECT * FROM todo WHERE user_id = $1 ",
      [user_id]
    );

    res.json({ data: allTodos.rows });
  } catch (error) {
    console.log(error);
  }
}

async function getTodo(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2",
      [id, user_id]
    );

    res.json({ data: todo.rows });
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(req, res) {
  const { id } = req.params;
  const { user_id } = req.user;
  const { description } = req.body;

  const updatedTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3",
    [description, id, user_id]
  );

  res.json({ message: "Todo was updated." });
  try {
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

async function deleteTodo(req, res) {
  const { id } = req.params;
  const { user_id } = req.user;

  try {
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2",
      [id, user_id]
    );

    res.json({ data: "Todo Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
}

async function updateTodoStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const { user_id } = req.user;

  try {
    const updatedTodo = await pool.query(
      "UPDATE todo SET status = $1 WHERE todo_id = $2 AND user_id = $3",
      [status, id, user_id]
    );

    return res.json({ message: "Status Updated." });
  } catch (error) {
    console.log(error);
  }
}

async function handleTodoStats(req, res) {
  const { user_id } = req.user;

  try {
    const totalTodosCreated = await pool.query(
      "SELECT * FROM todo WHERE user_id = $1",
      [user_id]
    );

    const completedTodos = await pool.query(
      "SELECT * FROM todo WHERE user_id = $1 AND status = $2",
      [user_id, "Completed"]
    );

    return res.status(200).json({
      totalTodo: totalTodosCreated.rows.length,
      completedTodos: completedTodos.rows.length,
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
  handleTodoStats,
};
