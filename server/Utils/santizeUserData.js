/**
 * Santize User data removing password
 * 
 * @param {*} param0 
 */
export const sanitizeUserData = ({_id,
  firstname,
  lastname,
  username,
  email}) => (
  {
    _id,
    firstname,
    lastname,
    username,
    email
  }
  );