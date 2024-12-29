import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (image: string) => {
  const cloudName = process.env.CLOUD_NAME;
  const cloudApiKey = process.env.CLOUD_API_KEY;
  const cloudApiSecretKey = process.env.CLOUD_API_SECRET_KEY;
  console.log(cloudName, cloudApiKey, cloudApiSecretKey);

  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecretKey,
  });

  const result = await cloudinary.uploader.upload(image, {
    folder: "YUU",
  });
  const link = result.secure_url;
  return link;
};
