import { Field, ID, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@ObjectType()
@Entity("user_relationships")
export class UserRelationships {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (user) => user.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followerId" })
  follower: Users;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (user) => user.followings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followingId" })
  following: Users;

  @Field()
  @CreateDateColumn({
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;
}
