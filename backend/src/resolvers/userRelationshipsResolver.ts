import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserRelationships } from "../entities/UserRelationship";
import { AppDataSource } from "../config/data-source";
import { Users } from "../entities/Users";
import {
  DefaultResponse,
  GetUserRelationshipsResponse,
} from "../objectTypes/objectTypes";

@Resolver()
export class UserRelationshipResolver {
  @Mutation(() => DefaultResponse)
  async follow_unfollow_user(
    @Arg("id") id: string,
    @Arg("followingId") followingId: string
  ) {
    const userRepository = AppDataSource.getRepository(Users);
    const relationshipRepository =
      AppDataSource.getRepository(UserRelationships);

    const follower = await userRepository.findOne({ where: { id } });
    if (!follower) throw new Error("Follower not found");
    const following = await userRepository.findOne({
      where: { id: followingId },
    });
    if (!following) throw new Error("Following not found");

    const existingRelationship = await relationshipRepository.findOne({
      where: {
        follower: { id },
        following: { id: followingId },
      },
    });
    if (existingRelationship) {
      await relationshipRepository.delete({
        follower,
        following,
      });

      return { message: `Unfollowed ${following.fullName}` };
    }
    const newRelationShip = relationshipRepository.create({
      follower,
      following,
    });

    await relationshipRepository.save(newRelationShip);
    return { message: `Following ${following.fullName}` };
  }

  @Query(() => GetUserRelationshipsResponse)
  async get_user_relationships(@Arg("id") id: string) {
    try {
      const followers = AppDataSource.getRepository(UserRelationships)
        .createQueryBuilder("relationship")
        .leftJoinAndSelect("relationship.follower", "follower")
        .where("relationship.followingId = :id", { id })
        .getMany();
      const followings = AppDataSource.getRepository(UserRelationships)
        .createQueryBuilder("relationship")
        .leftJoinAndSelect("relationship.following", "following")
        .where("relationship.followerId = :id", { id })
        .getMany();
      return { followers, followings };
    } catch (error) {
      throw new Error("Unable to fetch followers");
    }
  }
}
