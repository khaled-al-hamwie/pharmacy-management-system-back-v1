import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Ability } from "../../abilities/entities/ability.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    role_id: string;

    @Column({ type: "varchar", length: 45, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => User, (user) => user.role)
    users: Relation<User[]>;

    @OneToMany(() => Ability, (ability) => ability.role)
    abilities: Relation<Ability[]>;
}
