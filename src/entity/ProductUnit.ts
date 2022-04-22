import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdcutCategory } from './ProductCategory';

@Entity()
export class ProductUnit {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // 단위명
  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToOne((type) => ProdcutCategory, (productCategory) => productCategory.id)
  prodcutCategory: ProdcutCategory;
}
