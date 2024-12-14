const pool = require("../db/db");

const createTransaction = async (transaction) => {
  const { date_time, type, from_to, description, amount } = transaction;
  try {
    const result = await pool.query(
      "INSERT INTO transactions (date_time, type, from_to, description, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [date_time, type, from_to, description, amount]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const getTransactionsByUserId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

module.exports = { createTransaction, getTransactionsByUserId };
