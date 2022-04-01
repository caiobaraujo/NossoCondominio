import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://api.b7web.com.br/devcond/api';

// essa funçao meio que simula um axios
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
    await AsyncStorage.removeItem('property');
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
  getWall: async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('get', 'walls', {}, token);
    return response;
  },
  likeWallPost: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('post', `wall/${id}/like`, {}, token);
    return response;
  },
  getDocs: async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('get', 'docs', {}, token);
    return response;
  },
  getBillets: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let response = await request(
      'get',
      'billets',
      {
        property: property.id,
      },
      token
    );
    return response;
  },
  getWarnings: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let response = await request(
      'get',
      'warnings',
      {
        property: property.id,
      },
      token
    );
    return response;
  },
  addWarning: async (title, list) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let response = await request(
      'post',
      'warning',
      {
        title,
        list,

        property: property.id,
      },
      token
    );
    return response;
  },
  getReservations: async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('get', 'reservations', {}, token);
    return response;
  },
  getDisableDates: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let response = await request(
      'get',
      `reservation/${id}/disableddates`,
      {},
      token
    );
    return response;
  },
  getReservationTimes: async (id, date) => {
    let token = await AsyncStorage.getItem('token');
    let response = await request(
      'get',
      `reservation/${id}/times`,
      { date },
      token
    );
    return response;
  },
  setReservation: async (id, date, time) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let response = await request(
      'post',
      `reservation/${id}`,
      {
        property: property.id,
        date,
        time,
      },
      token
    );
    return response;
  },
  getMyReservations: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let response = await request(
      'get',
      'myreservations',
      { property: property.id },
      token
    );
    return response;
  },
  removeReservation: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let response = await request('delete', `myreservations/${id}`, {}, token);
    return response;
  },
  getFoundAndLost: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('get', 'foundandlost', {}, token);
    return json;
  },
  setRecovered: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let json = await request(
      'put',
      `foundandlost/${id}`,
      {
        status: 'recovered',
      },
      token
    );
    return json;
  },
  addLostItem: async (photo, description, where) => {
    let token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('description', description);
    formData.append('where', where);
    formData.append('photo', {
      uri: photo,
      type: photo.type,
      name: photo.fileName,
    });
    let req = await fetch(`${baseUrl}/foundandlost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    let json = await req.json();
    return json;
  },
  getUnitInfo: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let json = await request('get', `unit/${property.id}`, {}, token);
    return json;
  },
  removeUnitItem: async (type, id) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);

    let json = await request(
      'post',
      `unit/${property.id}/remove${type}`,
      {
        id,
      },
      token
    );
    return json;
  },
  addUnitItem: async (type, body) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);

    let json = await request(
      'post',
      `unit/${property.id}/add${type}`,
      body,
      token
    );
    return json;
  },
};
