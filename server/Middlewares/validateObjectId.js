import { ObjectID } from 'mongodb';
import Response from '../Utils/response';

const validateObjId = (req, res, next) => {
  const {id} = req.params;
  try {
    new ObjectID(id);
    return next();
  } catch (error) {
    return Response(res, 400,"Invalid Id passed");
  }
}

export default validateObjId;
