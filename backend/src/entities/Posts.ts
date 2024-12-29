import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./Users";
import { Likes } from "./Likes";
import { Comments } from "./Comments";

@ObjectType()
@Entity()
export class Posts {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({
    name: "userId",
    foreignKeyConstraintName: "userPostsForeignKey",
  })
  user: Users;

  @Field(() => String, { nullable: true })
  @Column("text")
  text: string;

  @Field(() => String, { nullable: true })
  @Column("text")
  link: string;

  @Field(() => [Likes], { nullable: true })
  @OneToMany(() => Likes, (like) => like.post, {
    eager: true,
    cascade: true,
  })
  likes: Likes[];

  @Field(() => [Comments], { nullable: true })
  @OneToMany(() => Comments, (comment) => comment.post, {
    eager: true,
    cascade: true,
  })
  comments: Likes[];

  @Field()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
