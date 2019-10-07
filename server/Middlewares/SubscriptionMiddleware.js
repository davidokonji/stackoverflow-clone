import Subscription from "../Models/Subscription";
import Response from "../Utils/response";

class SubscriptionMiddleware {
  
  /**
   * Toogling user subscription
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async toogleSubscription(req, res, next) {
    const { _id } = req.user;
    const subscriber = await Subscription.findOne({subscriber: _id, isActive: true});
    if(subscriber) {
      subscriber.isActive = false;
      subscriber.save();
      return Response(res, 200, 'Unsubscribed from question', subscriber);
    }
    return next();
  }
}

export default SubscriptionMiddleware;
