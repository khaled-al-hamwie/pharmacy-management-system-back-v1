import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    role_id: string;

    @Column({ type: "varchar", length: 45, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: Relation<User[]>;
}
