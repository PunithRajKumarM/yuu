import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cropper from 'react-easy-crop';

export default function Popup({
  open,
  handleAgree,
  handlerDisagree,
  title,
  description,
  agreeText,
  image,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  setZoom,
}: {
  open: boolean;
  title: string;
  description: string;
  handleAgree: () => void;
  handlerDisagree: () => void;
  agreeText: string;
  image?: string;
  crop?: {
    x: number;
    y: number;
  };
  zoom?: number;
  setCrop?: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  onCropComplete?: (croppedArea: any, croppedAreaPixels: any) => void;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isCroppingImage = image && crop && zoom && setCrop && onCropComplete && setZoom;
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {isCroppingImage && (
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Cropper
              style={{
                containerStyle: {
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  backgroundColor: 'black',
                },
                cropAreaStyle: {
                  background: 'rgba(0, 0, 0, 0.5)',
                },
              }}
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </DialogContent>
      )}
      {!isCroppingImage && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handlerDisagree}>Cancel</Button>
        <Button onClick={handleAgree} autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
