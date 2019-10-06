import Response from "../Utils/response";
import Notification from "../Models/Notifications";

class UserController {
  static async getNotifications(req, res) {
    const { _id } = req.user;
    const userNotifications = await Notification.find({user: _id})
    .populate('Question').exec();
    if(!userNotifications) return Response(res, 404, 'No notifications');
    return Response(res, 200, 'Successfully Fetched Notification', userNotifications);
  }
}

export default UserController;
