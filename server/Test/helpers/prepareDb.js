import User from '../../Models/User';
import Question from '../../Models/Question';

let models = {
  user: User,
  question: Question
}
/**
 * Preparing Db before testing
 * 
 * @param {*} key 
 */
const prepareDb = async (key) =>  {
  return await models[key].deleteMany({});
};

export default prepareDb;
