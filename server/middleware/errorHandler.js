import { MulterError } from "multer";

const errorHandler = (err, req, res, next) => {
  console.error(" Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof MulterError) {
    message = "File upload error: " + err.message;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Token has expired";
    statusCode = 401;
  }

  res.status(statusCode).json({ success: false, error: message });
};

export default errorHandler;
