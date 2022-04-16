import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // 대분류 [0: 냉장고...]
  @Column()
  code: number;

  // 제품명
  @Column({ length: 255 })
  name: string;

  // 분류 시리얼
  @Column({ length: 255 })
  serial: string;

  // 제조사
  @Column({ length: 255 })
  manufacture: string;

  // 크기
  @Column({ length: 255 })
  size: string;

  // 유형
  @Column()
  type: number;

  // 대표 썸네일
  @Column({ length: 255 })
  image: string;

  // 블로그 주소
  @Column({ length: 255, default: null })
  url: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
