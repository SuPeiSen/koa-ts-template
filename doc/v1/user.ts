export default class User {
  static desc = '用户';
  get_test() {
    return {
      method: 'get',
      description: '用户测试',
      path: '/get_test',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
  post_test() {
    return {
      method: 'post',
      description: '',
      path: '/post_test',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
  put() {
    return {
      method: 'get',
      description: '',
      path: '/put',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
}
