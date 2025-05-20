export default class Test {
  static desc = '';
  get_test() {
    return {
      method: 'get',
      description: '',
      path: '/get_test',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
  get_() {
    return {
      method: 'get',
      description: '',
      path: '/get_',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
  delete_test() {
    return {
      method: 'delete',
      description: '',
      path: '/delete_test',
      request: {
        header: { 'Content-Type': 'application/json', Authorization: '' },
        body: {},
        query: {}
      },
      response: { body: {} }
    };
  }
}
