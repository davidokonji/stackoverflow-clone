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

respondSchema.index({response: 'text'});

respondSchema.query.searchResponse =  function (body) {
  const regex = new RegExp(body, 'ig');
  return this.find({
    response: {$regex: regex}
  })
}
const Responds = mongoose.model('Responses', respondSchema);

export default Responds;
