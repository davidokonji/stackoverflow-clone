import Question from "../Models/Question";
import Response from "../Utils/response";
import Vote from "../Models/Vote";

class QuestionsController {

  /**
   * Get All Questions
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async index(req, res) {
    const questions = await Question.find({})
    .populate({
      path: 'author',
      select: ['firstname','lastname','username','email']
    }).exec();
    return Response(res, 200,'Successfully fetched question', questions);
  }

  /**
   * Creating a new Question
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async create(req, res) {
    const { body: { body }, user: { _id } } = req;

    const newQestion = new Question({
      body,
      author: _id
    });

    newQestion.save(function(err, data) {
      if(err) return Response(res, 400,err.message);
      return Response(res, 201, 'New Question Created', data);
    });
  }

  /**
   * Get a single question
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static async show(req, res) {
    const { id } = req.params;

    const question = await Question.findById(id)
    .populate({
      path: 'author',
      select: ['firstname','lastname','username','email']
    })
    .exec();
    if (!question) return Response(res, 404, 'Question not found');
    return Response(res, 200,'Successfully fetched question', question);
  }

  static async upvote(req, res) {
    const { params: { id }, user: { _id } } = req;

    const question = await Question.findById(id);
    if(!question) return Response(res, 404, 'Question not found');
    question.vote += 1;
    question.save();
    //Tracking user votes
    new Vote({
      user: _id,
      question: question._id,
      type: 'up'
    }).save();
    return  Response(res, 200, 'Question Upvoted!', question);
  }

  static async downvote(req, res) {
    const { params: { id }, user: { _id } } = req;
    
      const question = await Question.findById(id);
      if(!question) return Response(res, 404, 'Question not found');
      question.vote -= 1;
      question.save();
      //Tracking user votes
      new Vote({
        user: _id,
        question: question._id,
        type: 'down'
      }).save();
      return  Response(res, 200, 'Question Downvoted!', question);
  }
}

export default QuestionsController;
