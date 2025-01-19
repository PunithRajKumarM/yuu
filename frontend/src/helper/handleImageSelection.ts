import { enqueueSnackbar } from 'notistack';
import { ErrorsList } from './ErrorsLists';
import { TSelectImage } from '../types/types';

export const handleImageSelection = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: TSelectImage
) => {
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

export const getCroppedImage = async (imageSrc: string, croppedAreaPixels: any) => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = () => {
      enqueueSnackbar('Error while reading file', { variant: 'error' });
    };
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise<string>((resolve, reject) => {
    try {
      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image);
    } catch (error) {
      reject(new Error('Failed to generate image'));
    }
  });
};
