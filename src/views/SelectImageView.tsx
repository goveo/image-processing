import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import ImagePicker from '../components/ImagePicker';
import { ImageContext } from '../context/image/ImageContext';

const SelectImageView: React.FC = () => {
  const { setImagePath } = useContext(ImageContext);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container>
      <TitleContainer>
        <Typography variant="h6" component="h1">
          Select an image for processing
        </Typography>
      </TitleContainer>
      <ImagePicker ref={inputRef} onChange={setImagePath} />
      <SelectImageButton
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<ImageIcon />}
        onClick={() => inputRef.current?.click()}
      >
        Select image
      </SelectImageButton>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin: 12px 0;
`;

const SelectImageButton = styled(Button)`
  width: 160px;
  margin: 200px;
`;

export default SelectImageView;
