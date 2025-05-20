import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import CustomBaseEntity from './custom_base_entity';

/**
 * admin-user table
 */
@Entity('test')
export class TestEntity extends CustomBaseEntity {
  @PrimaryColumn()
  id!: string;

  @CreateDateColumn()
  create_time!: number;
}
