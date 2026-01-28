import { ApiDoc } from 'koa-ts-core';
export default class User {
  static desc = '';
  get_test(): ApiDoc {
    return {
      method: 'get',
      path: '/get_test',
      summary: '',
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {}
    };
  }
  post_test(): ApiDoc {
    return {
      method: 'post',
      path: '/post_test',
      summary: '',
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {},
      security: []
    };
  }
  put(): ApiDoc {
    return {
      method: 'put',
      path: '/put',
      summary: '',
      tags: [],
      parameters: [],
      requestBody: { content: {} },
      responses: {}
    };
  }
}
