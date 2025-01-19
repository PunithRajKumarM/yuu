export const getImageUrl = (link: string | null) => {
  if (link) {
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const CLOUDINARY_BASE_URL = process.env.REACT_APP_CLOUDINARY_BASE_URL;
    const CLOUDINARY_IMAGE_PATH = process.env.REACT_APP_CLOUDINARY_IMAGE_PATH;
    const imageUrl = `${CLOUDINARY_BASE_URL}/${CLOUD_NAME}/${CLOUDINARY_IMAGE_PATH}/${link}`;
    return imageUrl;
  } else {
    return null;
  }
};
