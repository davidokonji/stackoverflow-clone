import { ObjectID } from 'mongodb';
import Response from "./response";
import isRequired from "./isRequired";
import isEmpty from "./isEmpty";

/* istanbul ignore file */

/**
 * Router assertations method
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} options 
 * @param {*} extra 
 */
const requiredAssertations = (req, res, next, options, extra) => {
  const requiredFields = isRequired(req.body, options);
  if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
    return Response(res, 422, requiredFields.map(err => err));
  }
  if (extra) return isEmpty(extra, res, next);
  return next();
}

/**
 * Validating Object ID
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validateObjId = (req, res, next) => {
  const { id } = req.params;
  try {
    new ObjectID(id);
    return next();
  } catch (error) {
    return Response(res, 400,"Invalid Id passed");
  }
}

export {
  requiredAssertations,
  validateObjId
};
