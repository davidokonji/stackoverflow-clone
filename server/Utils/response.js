/**
 * Response Handler
 * 
 * @param {*} res 
 * @param {*} code 
 * @param {*} message 
 * @param {*} data 
 */
const Response = (res, code, message,data = undefined) => {
  if (!data) {
    return res.status(code).json({
      status: code,
      message,
    });
  }
  return res.status(code).json({
    status: code,
    message,
    data
  });
};

export default Response;