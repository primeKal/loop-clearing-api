import { BaseEntity } from "src/generic/entity/base.entity";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { Clearing } from "src/clearing/entities/clearing.entity";



@Entity("user")
export class User extends BaseEntity<User> {

    @Column()
    name: string;

    @Column({ nullable: true })
    last_name: string;

    // @Column()
    // passwordHash: string;

    @Column({ nullable: true })
    @Exclude()
    password: string;

    @Column({ unique: true })
    email: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        console.log("hashPassword", this.password)
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.user_id,
    )
    transactions: Transaction[];


    @OneToMany(
        () => Transaction,
        (transaction) => transaction.partner_id,
    )
    partners: Transaction[];

    @OneToMany(
        () => Clearing,
        (clearing) => clearing.user_id,
    )
    clearings: Clearing[];


    // @OneToMany(
    //     () => BaseEntity,
    //     (user) => user.created_by,
    // )
    // creates: [];

}
