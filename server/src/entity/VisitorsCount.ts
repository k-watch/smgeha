import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class VisitorsCount {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  count: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
