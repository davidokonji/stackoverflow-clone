/**
 * Is Required Helper
 * 
 * @param {*} body 
 * @param {*} options 
 */
const isRequired = (body, options) => {
  const required = [];
  options.forEach((value) => {
    if (!Object.keys(body).includes(value)) {
      required.push({ [value]: `${value} field is required` });
    }
  });
  return required;
};

export default isRequired;