import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm";
import { Ability } from "../../abilities/entities/ability.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class UserAbility {
    @PrimaryGeneratedColumn("uuid")
    user_ability_id: string;

    @ManyToOne(() => User, (user) => user.user_abilities)
    @JoinColumn({ name: "user_id" })
    user: Relation<User>;

    @ManyToOne(() => Ability, (ability) => ability.user_abilities)
    @JoinColumn({ name: "ability_id" })
    ability: Relation<Ability>;
}
