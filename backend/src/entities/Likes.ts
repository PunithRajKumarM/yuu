import { Field, ID, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Posts } from "./Posts";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Likes {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Posts, { nullable: true })
  @ManyToOne(() => Posts, (post) => post.likes)
  @JoinColumn({
    name: "postId",
    foreignKeyConstraintName: "postLikesForeignKey",
  })
  post: Posts;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (user) => user.likes)
  @JoinColumn({
    name: "userId",
    foreignKeyConstraintName: "likedUserForeignKey",
  })
  user: Users;

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
