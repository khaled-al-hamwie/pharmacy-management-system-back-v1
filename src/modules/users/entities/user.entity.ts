import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({ type: "uuid" })
    role_id: string;

    @Column({ type: "varchar", length: 45, unique: true })
    user_name: string;

    @Column({ type: "varchar", length: 16 })
    first_name: string;

    @Column({ type: "varchar", length: 16 })
    last_name: string;

    @Column({ type: "varchar", length: 2000 })
    pic: string;

    @Column({ type: "varchar", length: 500 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
