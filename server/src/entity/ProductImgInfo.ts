import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductImgInfo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  mimetype: string;

  @Column({ length: 100 })
  path: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne((type) => Product, (product) => product.productImgInfo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;
}
