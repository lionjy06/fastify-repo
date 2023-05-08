import fetch, { BodyInit } from 'node-fetch';
import handleErrors from './fetchingInterceptor';

type ResType = 'blob' | 'arrayBuffer' | 'text' | 'stream' | 'document' | 'json';

type ConfigWithParam = {
  method: 'GET' | 'DELETE';
  url: string;

  responseType?: ResType;

  headers?: { 'Content-Type': string };
};
type ConfigWithBody = {
  method: 'POST' | 'PUT' | 'PATCH';
  url: string;

  body?: BodyInit | undefined;

  headers?: { 'Content-Type': string };
};

type AxiosModule = ConfigWithParam | ConfigWithBody;

const axios = async (config: AxiosModule) => {
  try {
    let response;

    const { url, ...rest } = config;

    if (rest.method === 'POST' || rest.method === 'PUT' || rest.method === 'PATCH') {
      response = await fetch(url, rest).then(handleErrors);
    } else if (rest.method === 'GET' || rest.method === 'DELETE') {
      response = await fetch(url, { ...rest }).then(handleErrors);
    }

    const data = await response?.json();

    return {
      headers: response?.headers,
      data,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const get = async (url: string) => {
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();
  return {
    headers: response.headers,
    data,
  };
};

const remove = async (url: string) => {
  const response = await fetch(url, { method: 'DELETE' });
  const data = await response.json();
  return {
    headers: response.headers,
    data,
  };
};

const post = async (url: string, body: object | string) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return {
    headers: response.headers,
    data,
  };
};

const put = async (url: string, body: object | string) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return {
    headers: response.headers,
    data,
  };
};

const patch = async (url: string, body: object | string) => {
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return {
    headers: response.headers,
    data,
  };
};

axios.get = get;
axios.post = post;
axios.put = put;
axios.patch = patch;
axios.delete = remove;
export default axios;
