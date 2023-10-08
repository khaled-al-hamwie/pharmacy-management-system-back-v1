import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    role_id: string;

    @Column({ type: "varchar", length: 16 })
    first_name: string;

    @Column({ type: "varchar", length: 16 })
    last_name: string;

    @Column({ type: "varchar", length: 500, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 2000, nullable: true })
    pic?: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role: Relation<Role>;
}
