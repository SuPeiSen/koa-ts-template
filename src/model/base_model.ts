import AppDataSource from '@/data-source';
import CustomBaseEntity from '@/entity/custom_base_entity';
import { EntityTarget, SelectQueryBuilder } from 'typeorm';

type TRecodeId = string | number;

class BaseModel {
  readonly db = AppDataSource.getInstance;

  /**
   * 对分页进行封装
   * @param {EntityTarget} entity  继承[BaseEntity]的类
   * @param {number} pageNum 页数
   * @param {number} pageSize 页size
   * @returns
   */
  async paging<T extends CustomBaseEntity>(entity: EntityTarget<T>, pageNum: number, pageSize: number = 10) {
    const repository = this.getRepository(entity);
    const builder = repository.createQueryBuilder();
    return this.paginateByQueryBuilder(builder, pageNum, pageSize);
  }

  /**
   * 对SelectQueryBuilder后进行分页
   * @param {SelectQueryBuilder} builder
   * @param {number} pageNum 页数
   * @param {number} pageSize 页size
   * @returns
   */
  async paginateByQueryBuilder<T extends CustomBaseEntity>(
    builder: SelectQueryBuilder<T>,
    pageNum: number,
    pageSize: number = 10
  ) {
    const skip = Math.max(0, Number(pageNum) - 1) * Number(pageSize);
    const [list, count] = await builder.skip(skip).take(pageSize).getManyAndCount();
    return {
      list,
      total: count
    };
  }

  /**
   * 对应表的主键字段为id是 查询id对应数据进行封装
   * @param id
   * @param {EntityTarget} entity
   * @param {string} tableKey - 主键
   * @returns
   */
  async getRecodeById<T extends CustomBaseEntity>(id: TRecodeId, entity: EntityTarget<T>, tableKey: string = 'id') {
    const where = `${tableKey} = :id`;
    return this.createBuilderByEntity(entity, 'table').where(where, { id: id }).getOne();
  }

  /**
   * 根据主键数组获取对应的数据列表
   * @param id
   * @param {EntityTarget} entity
   * @returns
   */
  async getRecodesByIds<T extends CustomBaseEntity>(ids: TRecodeId[], entity: EntityTarget<T>) {
    const repository = this.getRepository(entity);
    return repository.createQueryBuilder('table').whereInIds(ids).getMany();
  }

  /**
   * 获取Repository实例
   * @param entity
   * @returns
   */
  getRepository<T extends CustomBaseEntity>(entity: EntityTarget<T>) {
    return this.db.getRepository(entity);
  }

  /**
   * 获取createQueryBuilder()
   * @returns
   */
  getQueryBuilder() {
    return this.db.createQueryBuilder();
  }

  /**
   * 通过Entity创建createQueryBuilder
   * @param {T extends CustomBaseEntity} entity
   * @param {string?} alias
   * @returns
   */
  createBuilderByEntity<T extends CustomBaseEntity>(entity: EntityTarget<T>, alias?: string | undefined) {
    return this.getRepository(entity).createQueryBuilder(alias);
  }

  /**
   * 对事务进行封装
   * @param {() => Promise<boolean>} transaction - 执行一些操作
   * @param {(error: any) => void} errorCb - 有错误做出回滚完成回调
   * @returns
   */
  async transaction(transaction: () => Promise<void>, errorCb?: (error: any) => void) {
    return this.db.transaction(async () => {
      return await transaction()
        .then(() => true)
        .catch((error) => {
          errorCb?.(error);
          if (isDev) {
            console.error(error);
          }
          return false;
        });
    });
  }

  /**
   * 对应表的主键字段为id是 删除id对应数据进行封装
   * @param id
   * @param {EntityTarget} entity
   * @param {string} tableKey - 主键
   * @returns
   */
  async deleteRecodesById<T extends CustomBaseEntity>(id: TRecodeId, entity: EntityTarget<T>, tableKey: string = 'id') {
    const where = `${tableKey} = :id`;
    return this.createBuilderByEntity(entity).delete().where(where, { id: id }).execute();
  }
}

export default BaseModel;
