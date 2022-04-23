import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from './ProductCategory';

@Entity()
export class ProductUnit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  productId: number;

  // 단위명
  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // @ManyToOne(
  //   (type) => ProductCategory,
  //   (productCategory) => productCategory.productUnit,
  //   {},
  // )
  // productCategory: ProductCategory;
}
