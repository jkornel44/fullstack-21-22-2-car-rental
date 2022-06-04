import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Rental } from "../../rentals/entities/rental";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ unique: true })
    userName!: string;

    @Property()
    password!: string;

    @Enum()
    role!: UserRole;

    @OneToMany(() => Rental, (rental) => rental.user)
    rentals = new Collection<Rental>(this);
}

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER'
}