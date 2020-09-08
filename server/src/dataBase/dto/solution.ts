import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solutions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: number;

    @Column()
    score: number;
} 