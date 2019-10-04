import Question from "../Models/Question";
import Response from "../Utils/response";

class QuestionsController {

  static async index(req, res) {

  }

  static async create(req, res) {
    const { 
      body: {
        body
      },
      user: {
        _id
      }
     } = req;

    const newQestion = new Question({
      body,
      author: _id
    });

    newQestion.save(function(err, data) {
      if(err) return Response(res, 400,err.message);
      return Response(res, 201, 'New Question Created', data);
    });
  }

  static async show(req, res) {

  }
}

export default QuestionsController;
