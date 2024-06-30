import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm";

@Entity()
export class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  created_by_id?: number;

  @Column({ nullable: true })
  updated_by_id?: number;

  constructor(item: Partial<T>) {
    Object.assign(this, item);
  }

  // @ManyToOne(() => User, (user) => { user.creates })
  // @JoinColumn({ name: 'created_by_id' })
  // created_by: User
}