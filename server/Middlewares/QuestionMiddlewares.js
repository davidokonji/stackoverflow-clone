import {requiredAssertations} from "../Utils/routeAssertations";
import Question from "../Models/Question";
import Response from "../Utils/response";


class QuestionMiddlewares {

  static validateFields(req, res, next) {
    return requiredAssertations(req, res, next, ['title','body'], req.body)
  }

  static validateBodyField(req, res, next) {
    return requiredAssertations(req, res, next, ['body'], req.body)
  }

  static async validateQuestion(req, res, next) {
    const { id } = req.params;
    const question = await Question.findById(id);
    if(!question) return Response(res, 404, 'Question not found');
    return next();
  }
}

export default QuestionMiddlewares;
