exports.resHandler = (res, statusCode, status, data, message) => {
  res.status(statusCode).send({
    status,
    data,
    message,
  });
};
