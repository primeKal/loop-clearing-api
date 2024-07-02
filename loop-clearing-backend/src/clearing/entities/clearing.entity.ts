import { BaseEntity } from "src/generic/entity/base.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("clearing")
export class Clearing extends BaseEntity<Clearing> {

    @Column({ nullable: true })
    user_id: number;


    @Column()
    total_cleared_amount: number;

    @Column({ default: true })
    flow: boolean;

    @Column()
    remaining_amount: number;

    @Column({ default: 1 })
    clearing_cycle?: number;

    @Column('jsonb', { nullable: true })
    transactions?: object[];

    @Column({ default: 1 })
    clearing_steps?: number;

    @Column('jsonb', { nullable: true })
    future_transactions?: object[];

    @ManyToOne(() => User, (user) => { user.transactions }, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User

}
