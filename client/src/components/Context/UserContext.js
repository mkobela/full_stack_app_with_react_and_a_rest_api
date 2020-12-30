import Cookies from 'js-cookie';
import UserData from './UserData';

export default class UserContext {

  constructor(provider) {
    this.context = provider;
    this.userData = new UserData();
  }

  signIn = async (emailAddress, password) => {
    const user = await this.userData.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;

      this.context.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      
      const cookieOptions = {
        expires: 1 // 1 day
      };

      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.context.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  createUser = async (user) => {
    const data = await this.userData.createUser(user);
    return data;
  }
}