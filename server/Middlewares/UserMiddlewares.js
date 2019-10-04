import Response from "../Utils/response";
import validator from 'validator';
import isEmpty from "../Utils/isEmpty";
import isRequired from "../Utils/isRequired";

class UserMiddlewares {

  static async validateEmailPass(res, body, next) {
    const { email, password } = body;
    const errObj = {};
    if (email) {
      const checkemail = await validator.isEmail(email);
      if (!checkemail) errObj.email = `Email value ${email} is invalid`;
    }
    const checkpassword = await validator.isLength(password, {
      min: 8,
    });
    if (!checkpassword) errObj.passwordLength = 'Password should be a minimum of 8 characters';
    const condition = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const alphanumericpassword = await condition.test(password);
    if (!alphanumericpassword) errObj.passwordType = 'Password should be alphanumeric';
    if (Object.keys(errObj).length === 0) {
      return isEmpty(body, res, next);
    } else {
      return next(Response(res, 422, errObj));
    }
  }

  static async validateSignin(req, res, next) {
    return UserMiddlewares.validateEmailPass(res, req.body, next);
  }

  static async validateSignup(req, res, next) {
    const requiredFields = isRequired(req.body, ['email', 'password','firstname','lastname','username']);
    if ((typeof requiredFields === 'object') && requiredFields.length > 0) {
      return Response(res, 422, requiredFields.map(err => err));
    }
    return UserMiddlewares.validateEmailPass(res, req.body, next);
  }
}

export default UserMiddlewares;
