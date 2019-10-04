import Response from "./response";
import { verifyToken } from "./jwt-sign";

/**
 * Authenticated user middleware
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (typeof authorization === 'undefined') {
    return Response(res, 401, 'Unauthorized - Header Not Set');
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return Response(res, 401, 'Access Denied. Please Log In.');
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return Response(res, 401, 'Error in verification. Please try again');
  }
}

export default isAuthenticated;
