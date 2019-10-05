import Response from "../Utils/response";

class QuestionMiddlewares {

  static validateBodyField(req, res, next) {
    const { body } = req.body
    if (!body && body.trim().length === 0) {
      return Response(res, 422, "body is required");
    }
    return next();
  }
}

export default QuestionMiddlewares;
