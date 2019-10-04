import User from '../../Models/User';
   
const prepareUser = async () =>  await User.deleteMany({});

export default prepareUser;
