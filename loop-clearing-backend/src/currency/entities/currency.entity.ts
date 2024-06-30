import { Lookup } from "src/generic/entity/lookup.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("currency")
export class Currency extends Lookup<Currency> {
    
}
