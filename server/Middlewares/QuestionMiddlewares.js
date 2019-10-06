import {requiredAssertations} from "../Utils/routeAssertations";
import Question from "../Models/Question";
import Response from "../Utils/response";
import Vote from "../Models/Vote";


class QuestionMiddlewares {

  /**
   * Validating question body
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static validateFields(req, res, next) {
    return requiredAssertations(req, res, next, ['title','body'], req.body)
  }

  /**
   * Validating body field
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static validateBodyField(req, res, next) {
    return requiredAssertations(req, res, next, ['body'], req.body)
  }

  /**
   * Validate Question field
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async validateQuestion(req, res, next) {
    const { id } = req.params;
    const question = await Question.findById(id);
    if(!question) return Response(res, 404, 'Question not found');
    return next();
  }

  /**
   * Validate Voter
   * 
   * Voter should be able to vote only once
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  static async validateVoter(req, res, next) {
    const { params: { id }, user: { _id } } = req;
    const question = await Question.findOne({_id: id, author: _id});
    if(question) return Response(res, 400, "unsupported operation, can't vote own question");
    const voterExist = await Vote.findOne({question: id,user: _id});
    if(voterExist) return Response(res, 400, 'Vote already taken for question');
    return next();
  }
}

export default QuestionMiddlewares;
