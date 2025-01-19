import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../config/data-source";
import { ErrorsList } from "../constant/ErrorsList";
import { Posts } from "../entities/Posts";
import { Users } from "../entities/Users";
import { uploadToCloudinary } from "../helper/uploadToCloudinary";
import { PostInputType } from "../inputTypes/inputTypes";
import {
  DefaultResponse,
  GetUsersPostsResponse,
} from "../objectTypes/objectTypes";
import { Likes } from "../entities/Likes";

@Resolver()
export class PostResolver {
  @Mutation(() => DefaultResponse)
  async save_post(@Arg("post") post: PostInputType) {
    const { id, text, image } = post;
    const user = await AppDataSource.getRepository(Users).findOneBy({ id });
    try {
      if (!user) throw new Error(ErrorsList.USER_NOT_FOUND);

      await AppDataSource.transaction(async (transactionManager) => {
        try {
          let link = "";
          if (image) {
            const cloudinaryUrl = await uploadToCloudinary(image);
            link = cloudinaryUrl.split("/upload/")[1];
          }
          const newPost = new Posts();
          newPost.text = text || "";
          newPost.link = link;
          newPost.user = user;

          await transactionManager.save(newPost);
        } catch (error) {
          throw new Error(ErrorsList.FAILED_TO_STORE_POST);
        }
      });
      return {
        message: "Created post successfully!",
      };
    } catch (error) {
      throw error;
    }
  }

  @Query(() => GetUsersPostsResponse)
  async get_users_posts() {
    const userRepository = AppDataSource.getRepository(Users);
    try {
      if (!userRepository) throw new Error("No post table");
      const users = await userRepository.find({
        relations: [
          "posts",
          "posts.likes",
          "posts.likes.user",
          "posts.comments",
          "posts.comments.user",
        ],
      });
      users.forEach((user) => {
        user.posts.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      });
      return { users };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => DefaultResponse)
  async like_post(@Arg("id") id: string, @Arg("postId") postId: string) {
    try {
      let responseMessage: string = "";
      await AppDataSource.transaction(async (transactionManager) => {
        const likeRepository = transactionManager.getRepository(Likes);
        const userRepository = transactionManager.getRepository(Users);
        const postRepository = transactionManager.getRepository(Posts);

        const user = await userRepository.findOne({ where: { id } });
        const post = await postRepository.findOne({ where: { id: postId } });

        if (!user) throw new Error(ErrorsList.USER_NOT_FOUND);
        if (!post) throw new Error(ErrorsList.POST_NOT_FOUND);

        const existingLike = await likeRepository.findOne({
          where: { user: { id }, post: { id: postId } },
        });

        if (existingLike) {
          await likeRepository.delete({ id: existingLike.id });
          responseMessage = "Unliked post successfully!";
          return;
        }

        const like = likeRepository.create({ post, user });
        await likeRepository.save(like);
        responseMessage = "Liked post successfully!";
      });
      return { message: responseMessage };
    } catch (error) {
      throw error;
    }
  }
}
