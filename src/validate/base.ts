import Joi from 'joi';
import ParamException from '../exception/param_exception';

class BaseValidate {
  /**
   * 对Joi.validate进行封装
   * @param schema
   * @param value 校验参数
   */
  static joiValidate<T>(schema: Joi.ObjectSchema<T>, value: T) {
    const { error } = schema.validate(value);
    if (error) {
      throw new ParamException(error?.details[0].message ?? '');
    }
  }
}

export default BaseValidate;
