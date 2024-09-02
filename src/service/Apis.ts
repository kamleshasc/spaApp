import axios, {AxiosError, AxiosResponse} from 'axios';
import {API_URL} from '@env';

console.log(API_URL, 'API_URL');

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

export async function get({url, config = ''}: ApiProps) {
  let header = await getHeader(config);

  return await axios
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
  return await axios
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
  return await axios
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
  return await axios
    .post(API_URL + url, body, header)
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
