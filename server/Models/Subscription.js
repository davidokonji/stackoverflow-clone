import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  channel: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Subscription = mongoose.model('Subscriptions', subscriptionSchema);

export default Subscription;
