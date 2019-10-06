import '../config/db';
import User from "../Models/User";
import Response from '../Utils/response';
import { generateToken } from '../Utils/jwt-sign';
import { sanitizeUserData } from '../Utils/santizeUserData';

class UserController {

  /**
   * Create a User
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static createUser (req, res) {
    const newUser = new User(req.body);

    newUser.save(async function (err, data) {
      if(err) {
        const message = err.message.split(" ")[7].split("_")[0]
        return Response(res, 400,`${message} already exist`)
      }
    
      const sanitizeData = sanitizeUserData(data);
      const token = await generateToken(sanitizeData, '30d');

      return Response(res, 201, 'Successfully Registered User', {
        token,
        user: sanitizeData
     });
    });
  }

  /**
   * Sign In User
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static signinUser (req, res) {
    const { email, password, username } = req.body;
    let query = { email }
    if(username) {
      query = {
        $or: [
          {email},
          {username}
        ]
      };
    }

    return User.findOne(query,async function(err, user) {
      if(err) return Response(res,422,err.errmsg);
      if(!user) return Response(res, 401, 'Invalid Credentials');

      if(!user.validatePassword(password)) return Response(res, 401, 'Invalid Credentials');
      const sanitizeData = sanitizeUserData(user);
      const token = await generateToken(sanitizeData);
        return Response(res, 200, `Welcome Back ${user.username}`,{
          token,
          user: sanitizeData
        });
      
    });
  }
};

export default UserController;