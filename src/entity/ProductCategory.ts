import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductSubImage } from './ProductSubImage';
import { ProductUnit } from './ProductUnit';

@Entity()
export class ProductCategory {
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

  // @OneToMany(
  //   (type) => ProductUnit,
  //   (productUnit) => productUnit.productCategory,
  // )
  // productUnit: ProductUnit;
}
