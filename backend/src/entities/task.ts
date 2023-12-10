import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    name!: string

    @Column({
        type: "varchar",
        nullable: true,
    })
    description!: string

    @Column({
        default: "Active",
        enum: ['ACTIVE', 'DONE', 'DELETED'],
        nullable: false,
    })
    status!: string

    @Column({
        type: "datetime",
        nullable: false,
    })
    deadline!: string

}