import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductUnit } from './ProductUnit';

@Entity()
export class ProdcutCategory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // 카테고리명
  @Column({ length: 100 })
  name: string;

  // 카테고리 상위 분류
  @Column()
  parent: number;

  // 카테고리 타입
  @Column()
  type: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToOne((type) => ProductUnit, (productUnit) => productUnit.id)
  productUnit: ProductUnit[];
}
