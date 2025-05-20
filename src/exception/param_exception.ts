import { BaseException } from 'koa-ts-core';

class ParamException extends BaseException {
  constructor(message: string) {
    super({
      code: 500,
      message
    });
  }
}

export default ParamException;
