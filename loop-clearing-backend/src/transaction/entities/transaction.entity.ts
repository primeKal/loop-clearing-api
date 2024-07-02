import { BaseEntity } from "src/generic/entity/base.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("transaction")
export class Transaction extends BaseEntity<Transaction> {

    @Column({ nullable: true })
    user_id: number;

    @Column({ nullable: true })
    partner_id: number;

    @Column()
    value: number;

    @Column({ default: true })
    normal_flow: boolean;

    @Column({ default: false })
    is_future: boolean;


    @ManyToOne(() => User, (user) => { user.transactions }, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => User, (user) => { user.partners }, { eager: true })
    @JoinColumn({ name: 'partner_id' })
    partner: User

}
