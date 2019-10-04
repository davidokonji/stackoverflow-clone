import validator from 'validator';
import Response from './response';

/* istanbul ignore file */
/**
 * Empty values check helper
 * 
 * @param {*} body 
 * @param {*} res 
 * @param {*} next 
 */
const isEmpty = (body, res, next) => {
  const check = {};
  Object.entries(body).map((value) => {
    const trimmedValue = validator.trim(value[1]);
    const emptyValues = validator.isEmpty(trimmedValue);
    if (emptyValues) {
      check[`${value[0]}`] = `${value[0]} is required.`;
    }
    return check;
  });
  if (Object.keys(check).length !== 0) {
    return Response(res, 422, check);
  }
  return next();
};

export default isEmpty;