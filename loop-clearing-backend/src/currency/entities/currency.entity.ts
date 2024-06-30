import { Lookup } from "src/generic/entity/lookup.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("transaction")
export class Currency extends Lookup<Currency> {
    
}
