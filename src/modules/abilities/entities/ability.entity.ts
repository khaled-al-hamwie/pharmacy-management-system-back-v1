import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { UserAbility } from "../../user-abilities/entities/user-ability.entity";

@Entity()
export class Ability {
    @PrimaryGeneratedColumn("uuid")
    ability_id: string;

    @Column({ type: "varchar", length: 45, unique: true })
    name: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    describtion: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Role, (role) => role.abilities)
    @JoinColumn({ name: "role_id" })
    role: Relation<Role>;

    @OneToMany(() => UserAbility, (user_ability) => user_ability.ability)
    user_abilities: Relation<UserAbility[]>;
}
