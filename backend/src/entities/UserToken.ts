import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class UserToken {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Users)
  @OneToOne(() => Users, (user) => user.token)
  @JoinColumn({
    name: "userId",
    foreignKeyConstraintName: "userTokenForeignKey",
  })
  user: Users;

  @Field(() => String)
  @Column("text", { unique: true })
  refreshToken: string;

  @Field()
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;
}
