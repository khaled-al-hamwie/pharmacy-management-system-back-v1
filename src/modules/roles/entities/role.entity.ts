import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    role_id: string;

    @Column({ type: "varchar", length: 45, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;
}
