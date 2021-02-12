import React from 'react';

interface ImagePickerProps {
  onChange: (imagePath: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onChange }) => {
  return (
    <input
      type="file"
      name="name"
      accept="image/jpeg,image/png"
      onChange={(event) =>
        onChange(URL.createObjectURL(event.target.files?.[0]))
      }
    />
  );
};

export default ImagePicker;
