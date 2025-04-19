import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { userSchema } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { configDotenv } from "dotenv";

configDotenv();

export const registerController = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const data = { ...req.body, profile_image: imageUrl };

    const { error } = userSchema.validate(data);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { first_name, last_name, gender, email, password, profile_image } =
      data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, gender, email, password, profile_image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [first_name, last_name, gender, email, hashedPassword, profile_image]
    );

    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token: token, user: user });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const expireTime = new Date(Date.now() + 3600000); // 1 hour

    await pool.query(
      "UPDATE users SET reset_token = $1, reset_token_expire = $2 WHERE email = $3",
      [resetToken, expireTime, email]
    );

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
             <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
             <p>This link will expire in 1 hour.</p>`,
    });

    return res
      .status(200)
      .json({ success: true, message: "Reset link sent to email." });
  } catch (err) {
    console.error("Error in forgotPasswordController:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log(token, password);

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expire > NOW()",
      [token]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expire = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    console.error("Error in resetPasswordController:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const userResult = await pool.query(
      "SELECT id, first_name, last_name, email, gender, profile_image FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user: userResult.rows[0] });
  } catch (err) {
    console.error("Error in getProfileController:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
