import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const respondSchema = new Schema({
  response: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
});

const Responds = mongoose.model('Responses', respondSchema);

export default Responds;
