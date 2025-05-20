import Koa from 'koa';
import { Router, successRsp, AuthRouter } from 'koa-ts-core';

class User {
  @Router('get')
  async get_test(ctx: Koa.Context) {
    successRsp();
  }

  @AuthRouter('post')
  async post_test(ctx: Koa.Context) {
    successRsp();
  }

  // @Router()
  // async delete(ctx: Koa.Context) {
  //   successRsp();
  // }

  @Router()
  async put(ctx: Koa.Context) {
    successRsp();
  }
}

export default User;
