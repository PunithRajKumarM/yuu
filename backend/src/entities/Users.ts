import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserToken } from "./UserToken";

@ObjectType()
@Entity()
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text", { unique: true })
  email: string;

  @Field(() => String)
  @Column("text")
  userName: string;

  @Field(() => String)
  @Column("text")
  fullName: string;

  @Column("text", { select: false })
  password: string;

  @Field(() => Boolean)
  @Column("boolean", { default: false })
  isOnline: boolean;

  @Field(() => UserToken, { nullable: true })
  @OneToOne(() => UserToken, (token) => token.user, {
    eager: true,
    cascade: true,
  })
  token: UserToken;

  @Field()
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @Field()
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: string;
}
