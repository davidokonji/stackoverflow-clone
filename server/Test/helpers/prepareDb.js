import User from '../../Models/User';
import Question from '../../Models/Question';
import Responds from '../../Models/Respond';
import Vote from '../../Models/Vote';

let models = {
  user: User,
  question: Question,
  respond: Responds,
  vote: Vote
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
