import { Arg, Mutation, Resolver } from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { Posts } from "../entities/Posts";
import { Users } from "../entities/Users";
import { Comments } from "../entities/Comments";
import { DefaultResponse } from "../objectTypes/objectTypes";

@Resolver()
export class CommentsResolver {
  @Mutation(() => DefaultResponse)
  async add_comment(
    @Arg("postId") postId: string,
    @Arg("userId") userId: string,
    @Arg("comment") comment: string
  ) {
    const postRepository = AppDataSource.getRepository(Posts);
    const userRepository = AppDataSource.getRepository(Users);

    try {
      const existingPost = await postRepository.findOne({
        where: { id: postId },
      });
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!existingPost) throw new Error("No post available");
      if (!user) throw new Error("No user found");

      const newComment = new Comments();
      newComment.comment = comment;
      newComment.user = user;
      newComment.post = existingPost;
      await AppDataSource.getRepository(Comments).save(newComment);
      return { message: "Commented successfully" };
    } catch (error) {
      throw error;
    }
  }
}
