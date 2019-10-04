import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  type: {
    type: String,
    trim: true,
    enum: [
      'up',
      "down"
    ]
  }
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
