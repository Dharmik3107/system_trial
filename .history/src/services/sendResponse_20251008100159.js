const sendResponse = (res, statusCode, message, data = null) => {
  const dataJson = {
    status: statusCode,
    message: message,
    data,
  };
  return res.status(statusCode).json(dataJson);
};
