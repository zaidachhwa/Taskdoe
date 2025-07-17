const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "$uperman1243";

async function handleUserSignUp(req, res) {
  const { email, password, username } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "User Already exists with this email." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email , password , username) VALUES ($1 , $2 ,$3) RETURNING *",
      [email, hashedPassword, username]
    );

    res.json({ message: "User Created Successfully", data: newUser.rows });
  } catch (error) {
    console.log(error);
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const payload = {
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
    };

    const token = jwt.sign(payload, secret);

    res
      .cookie("token", token)
      .json({
        data: user.rows[0],
        token: token,
        message: "Logged In Successfully",
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
