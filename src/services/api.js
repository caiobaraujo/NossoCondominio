import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}/${endpoint}`;
  let body = null;

  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
      break;
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params);

      break;
  }
  let headers = { 'Content-Type': 'application/json' };

  if (token) {
    //headers['Authorization'] = `Bearer ${token}`;
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(fullUrl, {
    method: method,
    headers: headers,
    body: body,
  });

  const data = await response.json();
  return data;
};

export default {
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  validateToken: async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('post', 'auth/validate', {}, token);
    return response;
  },
  login: async (cpf, password) => {
    let response = await request('post', 'auth/login', { cpf, password });
    return response;
  },
  logout: async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('post', 'auth/logout', {}, token);
    await AsyncStorage.removeItem('token');
    return response;
  },
  register: async (name, cpf, email, password, passwordConfirm) => {
    let response = await request('post', 'auth/register', {
      name,
      cpf,
      email,
      password,
      passwordConfirm,
    });
    return response;
  },
};
