import { BaseEntity } from "src/generic/entity/base.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

export enum Status {
    Draft = "Draft",
    Generated = "Steps Generated",
    Done = "Done",
}
@Entity("clearing")
export class Clearing extends BaseEntity<Clearing> {

    @Column({ nullable: true })
    user_id: number;


    @Column({ nullable: true })
    total_cleared_amount: number;

    @Column({ default: true })
    flow: boolean;

    @Column({ nullable: true })
    remaining_amount: number;

    @Column({ default: 1 })
    clearing_cycle?: string;

    @Column('jsonb', { nullable: true })
    transactions?: object[];

    @Column({ default: 1 })
    clearing_steps?: number;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.Draft
    })
    status: Status;

    @Column('jsonb', { nullable: true })
    future_transactions?: object[];

    @ManyToOne(() => User, (user) => { user.transactions }, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User

}
