import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
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
export class Comments {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  comment: string;

  @Field(() => Posts, { nullable: true })
  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn({
    name: "postId",
    foreignKeyConstraintName: "postCommentsForeignKey",
  })
  post: Posts;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (user) => user.comments)
  @JoinColumn({
    name: "userId",
    foreignKeyConstraintName: "commentedUserForeignKey",
  })
  user: Users;

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
