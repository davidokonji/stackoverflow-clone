import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const question = new Schema({
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

const Question = mongoose.model('Question', question);

export default Question;
