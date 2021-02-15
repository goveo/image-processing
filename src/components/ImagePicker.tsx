import React, { useCallback } from 'react';

import { ImagePath } from '../context/image/types';

interface ImagePickerProps {
  hidden?: boolean;
  id?: string;
  onChange: (imagePath: ImagePath) => void;
}

const ImagePicker: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ImagePickerProps
> = ({ hidden = true, id, onChange }, ref) => {
  const getImageURL = useCallback((image?: File) => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, []);

  return (
    <input
      type="file"
      ref={ref}
      name="name"
      accept="image/jpeg,image/png"
      hidden={hidden}
      id={id}
      onChange={(event) => {
        onChange(getImageURL(event.target.files?.[0]));
      }}
    />
  );
};

export default React.forwardRef(ImagePicker);
