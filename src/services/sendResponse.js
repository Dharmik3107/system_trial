export const sendResponse = (res, dataObject) => {
  const { status, message, data = null } = dataObject;
  const dataJson = {
    status,
    message,
    data,
  };
  return res.status(status).json(dataJson);
};
