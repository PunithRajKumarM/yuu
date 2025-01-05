import { enqueueSnackbar } from "notistack";
import { ErrorsList } from "./ErrorsLists";
import { TSelectImage } from "../types/types";

export const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>, setImage: TSelectImage) => {
  const selectedImage = e.target.files?.[0] || null;
  if (!selectedImage) return enqueueSnackbar(ErrorsList.UNSUPPORTED_FORMAT, { variant: 'error' });

  if (!selectedImage.type.startsWith('image/'))
    return enqueueSnackbar(ErrorsList.ONLY_IMAGE, { variant: 'error' });

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(selectedImage);
};
