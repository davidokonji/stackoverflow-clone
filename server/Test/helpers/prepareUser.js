import User from '../../Models/User';
import Question from '../../Models/Question';

let models = {
  user: User,
  question: Question
}
const prepareDb = async (key) =>  {
  return await models[key].deleteMany({});
};

export default prepareDb;
