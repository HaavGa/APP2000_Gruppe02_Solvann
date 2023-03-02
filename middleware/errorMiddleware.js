const errorHandler = (err, req, res, next) => {
  // 500 - internal server error
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Hvis den er i production så ikke vis errormeldinger.
    stack: import.meta.env.DEV ? err.stack : null,
  });
};

export { errorHandler };
