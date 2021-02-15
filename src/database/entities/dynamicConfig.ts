import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class DynamicConfig {
    @PrimaryColumn('varchar') key: string;

    @Column('varchar') value: string;
}