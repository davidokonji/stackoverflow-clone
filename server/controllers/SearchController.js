import User from "../Models/User";
import Responds from "../Models/Respond";
import Response from '../Utils/response';
import Question from "../Models/Question";

class SearchController {

  /**
   * Search Method
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async search(req, res) {
    const { query } = req.query;
    
    const questions = await Question.find().searchQuestion(query).exec();

    const responses = await Responds.find().searchResponse(query).exec();

    const users = await User.find().searchUser(query).exec();

    return Response(res, 200, 'Search Results', {
      users,
      questions,
      responses
    });
  }
}

export default SearchController;
