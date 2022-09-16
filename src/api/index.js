import axios from 'axios';
import { API_URL } from './config';

const getLastUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL + '/chat/api/last-users')
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export { getLastUsers };
