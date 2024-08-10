import axios, {AxiosError, AxiosResponse} from 'axios';
// import {BASE_URL} from '@env';

const BASE_URL = 'http://192.168.1.70:3200/api/v1';

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
    .get(BASE_URL + url, header)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export async function deleteData({url, config = ''}: ApiProps) {
  let header = await getHeader(config);
  return await axios
    .delete(BASE_URL + url, header)
    .then(response => {
      return response.data;
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
    .put(BASE_URL + url, body, header)
    .then(response => {
      return response.data;
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
    .post(BASE_URL + url, body, header)
    .then(response => {
      return response.data;
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
