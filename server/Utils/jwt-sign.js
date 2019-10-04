import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './response';

dotenv.config();

/**
 * Generate Token
 * 
 * @param {*} payload 
 * @param {*} exp 
 */
const generateToken = async (payload, exp = '30d') => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp
  });

  return token;
};

/**
 * Verify Token
 * @param {*} token 
 * @param {*} res 
 */
const verifyToken = (token, res) => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return Response(res, 401, err.message);
  }
  return decoded;
});


export {
  generateToken,
  verifyToken
}