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
import { ProductRecommend } from './ProductRecommend';
import { ProductSubImage } from './ProductSubImage';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // 대분류 [0: 냉장고...]
  @Column()
  code: number;

  // 제품명
  @Column({ length: 100 })
  name: string;

  // 제조사
  @Column()
  manufacture: number;

  // 크기
  @Column({ length: 100 })
  size: string;

  // 유형
  @Column()
  type: number;

  // 대표 썸네일
  @Column({ length: 100 })
  image: string;

  // 블로그 주소
  @Column({ length: 100, default: null })
  url: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(
    (type) => ProductSubImage,
    (productSubImage) => productSubImage.product,
  )
  productSubImage: ProductSubImage[];
}
