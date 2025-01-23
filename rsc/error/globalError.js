export const globalError = (error, req, res, next) => {
     // Set a default status code and message if not provided
  const statusCode = error.statusCode || 500; // Default to 500 (Internal Server Error)
  const message = error.message || "Something went wrong!";

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Show stack trace in development only
  });
};
