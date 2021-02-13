import React from 'react';

interface ImagePickerProps {
  hidden?: boolean;
  id?: string;
  onChange: (imagePath: string) => void;
}

const ImagePicker: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ImagePickerProps
> = ({ hidden = true, id, onChange }, ref) => {
  return (
    <input
      type="file"
      ref={ref}
      name="name"
      accept="image/jpeg,image/png"
      hidden={hidden}
      id={id}
      onChange={(event) =>
        onChange(URL.createObjectURL(event.target.files?.[0]))
      }
    />
  );
};

export default React.forwardRef(ImagePicker);
