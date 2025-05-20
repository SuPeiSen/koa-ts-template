import Koa from 'koa';
import { successRsp, Router, AuthRouter } from 'koa-ts-core';

class Test {
  @Router('get')
  async get_test(ctx: Koa.Context) {
    successRsp();
  }

  @Router()
  async get_(ctx: Koa.Context) {
    successRsp();
  }

  @AuthRouter('delete')
  async delete_test(ctx: Koa.Context) {
    successRsp();
  }
}

export default Test;
