import axios, {AxiosError, AxiosResponse} from 'axios';
import {API_URL,IMAGE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearUserScreens} from '../redux/Action/authAction';
import {store} from '../redux/store';
import {resetTo} from '../../App';
let isRefreshing = false; // To track if the refresh token request is already in progress

console.log(API_URL, 'API_URL');
console.log(IMAGE_URL, 'IMAGE_URL');

interface ApiProps {
  url: string;
  config?: any;
  body?: any;
  hasFormData?: boolean | undefined;
}

interface headerProps {
  config?: any;
  hasFormData?: boolean | undefined;
}

const instance = axios.create({
  baseURL: API_URL,
});

const logoutUser = async () => {
  try {
    store.dispatch(clearUserScreens());
    resetTo('Login');
  } catch (error) {
    console.error('Failed to logout user', error);
  }
};

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error?.config;
    if (error?.response?.status !== 403) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 403 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refToken = await AsyncStorage.getItem('refreshToken');
        if (refToken) {
          const response = await instance.post('/auth/new-refresh-token', {
            refreshToken: refToken,
          });
          if (response && response?.data?.data) {
            const {token, refreshToken} = response?.data?.data;
            if (token && refreshToken) {
              await AsyncStorage.setItem('accessToken', token);
              await AsyncStorage.setItem('refreshToken', refreshToken);
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            }
          }
          await logoutUser();
          return Promise.reject(error);
        }
      } catch (err) {
        await logoutUser();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    } else {
      logoutUser();
      return Promise.reject(error);
    }
  },
);

export default instance;

export async function get({url, config = ''}: ApiProps) {
  let header = await getHeader(config);

  return await instance
    .get(API_URL + url, header)
    .then(response => {
      return response?.data;
    })
    .catch(error => {
      throw error;
    });
}

export async function deleteData({url, config = ''}: ApiProps) {
  let header = await getHeader(config);
  return await instance
    .delete(API_URL + url, header)
    .then(response => {
      return response?.data;
    })
    .catch(error => {
      throw error;
    });
}

export async function put({
  url,
  body,
  config = '',
  hasFormData = false,
}: ApiProps) {
  let header = await getHeader({config, hasFormData});
  return await instance
    .put(API_URL + url, body, header)
    .then(response => {
      return response?.data;
    })
    .catch(error => {
      throw error;
    });
}

export async function post({
  url,
  body,
  config = '',
  hasFormData = false,
}: ApiProps): Promise<AxiosResponse | AxiosError> {
  let header = await getHeader({config, hasFormData});
  return await instance
    .post(API_URL + url, body, header)
    .then(response => {
      return response?.data;
    })
    .catch(error => {
      throw error;
    });
}

export async function patch({
  url,
  body,
  config = '',
  hasFormData = false,
}: ApiProps): Promise<AxiosResponse | AxiosError> {
  let header = await getHeader({config, hasFormData});

  return await instance
    .patch(API_URL + url, body, header)
    .then(response => {
      return response?.data;
    })
    .catch(error => {
      throw error;
    });
}

async function getHeader({
  config,
  hasFormData = false,
}: headerProps): Promise<{headers: Record<string, string>}> {
  const headers: Record<string, string> = {
    'Content-Type': hasFormData ? 'multipart/form-data' : 'application/json',
  };

  if (config) {
    headers['Authorization'] = `Bearer ${config}`;
  }

  return {headers};
}
