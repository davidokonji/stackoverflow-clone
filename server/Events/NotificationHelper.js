import io from './index';
import Subscription from '../Models/Subscription';
import Notification from '../Models/Notifications';

class NotificationHelper {
  static async notifyUsers(data) {
   const subscribers = await NotificationHelper.getSubcribedUsers(data.question);
   subscribers.map((value) => {
    NotificationHelper.setNotification({
      user: value.subscriber,
      notification: data.question
    });
    NotificationHelper.notify(value.channel);
   });
  }

  static notify(channel) {
    io.on('connection', () => {
      io.to(channel).emit('notification', 'New response on subscribed question');
    });
  }

  static subscribe(channel) {
    io.on('connection',(socket) => {
      socket.join(channel);
    });
  }

  static async getSubcribedUsers(id) {
    return await Subscription.find({question: id });
  }

  static async setNotification(payload) {
    const newNotification = new Notification(payload);
    return newNotification.save();
  }
}

export default NotificationHelper;
