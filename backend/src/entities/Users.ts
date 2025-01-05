import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserToken } from "./UserToken";
import { Posts } from "./Posts";
import { Likes } from "./Likes";
import { Comments } from "./Comments";
import { UserRelationships } from "./UserRelationship";

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

  @Column("text")
  password: string;

  @Field(() => Boolean)
  @Column("boolean", { default: false })
  isOnline: boolean;

  @Field(() => String, { nullable: true })
  @Column("text", { default: null })
  profilePicture: string | null;

  @Field(() => UserToken, { nullable: true })
  @OneToOne(() => UserToken, (token) => token.user, {
    eager: true,
    cascade: true,
  })
  token: UserToken;

  @Field(() => [Posts], { nullable: true })
  @OneToMany(() => Posts, (post) => post.user, {
    eager: true,
    cascade: true,
  })
  posts: Posts[];

  @Field(() => [Likes], { nullable: true })
  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @Field(() => [UserRelationships])
  @OneToMany(() => UserRelationships, (relationship) => relationship.follower)
  followers: UserRelationships[];

  @Field(() => [UserRelationships])
  @OneToMany(() => UserRelationships, (relationship) => relationship.following)
  followings: UserRelationships[];

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
