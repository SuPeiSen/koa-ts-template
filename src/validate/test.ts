import Koa from 'koa';
import BaseValidate from './base';

class Test extends BaseValidate {
  static get_test(ctx: Koa.Context) {}
}

export default Test;
