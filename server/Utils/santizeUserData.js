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