import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const question = new Schema({
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Question = mongoose.model('Question', question);

export default Question;
