export const sendResponse = (res, dataObject) => {
  const { statusCode, message, data = null } = dataObject;
  const dataJson = {
    status: statusCode,
    message: message,
    data,
  };
  return res.status(statusCode).json(dataJson);
};
