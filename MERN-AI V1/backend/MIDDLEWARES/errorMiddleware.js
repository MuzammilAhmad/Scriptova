const errorHandler = (err, req, res, next) => {
  // console.error("Error occurred:", err);

  // Set the response status code and message

  // If the response status code is 200, set it to 500
  //   const statusCode = err.statusCode || 500;
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  const message = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({
    status: false,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
    message: message,
    error: err,
  });
};
module.exports = errorHandler;
