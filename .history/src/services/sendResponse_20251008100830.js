export const sendResponse = (res, dataObject) => {
  const { status, message, data = null } = dataObject;
  const dataJson = {
    status,
    message,
    data,
  };
  return res.status(statusCode).json(dataJson);
};
