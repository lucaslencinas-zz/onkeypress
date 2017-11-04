module.exports = function errorMiddleware(err, req, res, next) {
  // Piping the response to the client
  if (res.headersSent) {
    // Express handle the error and stop sending data to the client
    return next(err);
  }

  const responseError = {
    name: err.name,
    status: err.status,
    message: err.message
  };

  console.log(err);

  res.status(err.status).json(responseError);

  return next(err);
};
