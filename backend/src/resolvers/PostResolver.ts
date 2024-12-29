import { Arg, Mutation, Resolver } from "type-graphql";
import { PostInputType } from "../inputTypes/inputTypes";
import { AppDataSource } from "../config/data-source";
import { Posts } from "../entities/Posts";
import { Users } from "../entities/Users";
import { ErrorsList } from "../constant/ErrorsList";
import { DefaultResponse } from "../objectTypes/objectTypes";
import { uploadToCloudinary } from "../helper/uploadToCloudinary";

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
            link = await uploadToCloudinary(image);
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
}
