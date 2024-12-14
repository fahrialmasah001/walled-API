const pool = require("../db/db");

const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users where id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrongg");
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { nama, email, password, no_hp } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (nama, email, password, no_hp) VALUES ($1, $2, $3, $4) RETURNING *",
      [nama, email, password, no_hp]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const findAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const login = async (userData) => {
  let user = await findUserByEmail(userData.email);

  if (user.rows.length === 0) {
    throw new Error("user not found");
  }

  const isValid = await bcrypt.compare(userData.password, user.rows[0].password);

  if (!isValid) {
    throw new Error("invalid password");
  }

  return user.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById, findAllUsers, login };
