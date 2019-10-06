import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notification: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
});

const Notification = mongoose.model('Notifications', notificationSchema);

export default Notification;
