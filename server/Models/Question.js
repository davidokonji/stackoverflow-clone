import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const question = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

question.index({ title: "text", body: "text",},
{ weights: { title: 5, body: 3, } });

question.query.searchQuestion = function(body) {
  const regex = new RegExp(body, 'ig');
  return this.find({
    $or: [
      {title: regex},
      {body: regex}
    ]
  })
}

const Question = mongoose.model('Question', question);

export default Question;
