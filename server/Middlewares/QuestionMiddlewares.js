import Response from "../Utils/response";

class QuestionMiddlewares {

  static validateQuestion(req, res, next) {
    const { body } = req.body
    if (!body && body.trim().length === 0) {
      return Response(res, 422, "Question body is required");
    }
    return next();
  }

  static validateResponse(req, res, next) {
    const { body } = req.body
    if (!body && body.trim().length === 0) {
      return Response(res, 422, "Response is required");
    }
    return next();
  }

}

export default QuestionMiddlewares;
