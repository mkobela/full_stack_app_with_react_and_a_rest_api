import Cookies from 'js-cookie';
import BaseData from './BaseData';

/**
* @class UserData
* @classdesc User Data context
*/
export default class UserData extends BaseData{
  constructor(provider) {
    super();
    this.context = provider;
  }

  signIn = async (emailAddress, password) => {
    const user = await this.getUser(emailAddress, password);
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
  
  signUp = async (user) => {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  getUser = async (emailAddress, password) => {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }
}