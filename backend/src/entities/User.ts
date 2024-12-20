import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
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

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: string;
}
