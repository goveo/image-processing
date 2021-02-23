import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import ImagePicker from '../components/ImagePicker';
import { ImageContext } from '../context/image/ImageContext';
import { ImagePath } from '../context/image/types';
import copyCanvasData from '../utils/copyCanvasData';
import renderImageToCanvas from '../utils/renderImageToCanvas';

const MergeView: React.FC = () => {
  const [imagePath, setImagePath] = useState<ImagePath>(null);
  const [mergePercent, setMergePercent] = useState<number>(50);

  const imagePickerRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const mergedCanvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  useEffect(() => {
    if (!imageCanvas || !leftCanvasRef.current) return;
    copyCanvasData(imageCanvas, leftCanvasRef.current);
  }, [imageCanvas]);

  const mergeImages = useCallback(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    const mergedCanvas = mergedCanvasRef.current;
    const leftCanvasContext = leftCanvas?.getContext('2d');
    const rightCanvasContext = rightCanvas?.getContext('2d');
    const mergedCanvasContext = mergedCanvas?.getContext('2d');
    if (
      !leftCanvas ||
      !rightCanvas ||
      !leftCanvasContext ||
      !rightCanvasContext ||
      !mergedCanvasContext
    )
      return;

    const { data: leftImageData } = leftCanvasContext.getImageData(
      0,
      0,
      leftCanvas.width,
      leftCanvas.height,
    );
    const { data: rightImageData } = rightCanvasContext.getImageData(
      0,
      0,
      leftCanvas.width, // cut image with left canvas dimensions
      leftCanvas.height,
    );

    const mergedImageData = leftImageData.map((value, index) => {
      return (
        (value * (100 - mergePercent) + rightImageData[index] * mergePercent) /
        100
      );
    });

    mergedCanvasContext.putImageData(
      new ImageData(mergedImageData, leftCanvas.width, leftCanvas.height),
      0,
      0,
    );
  }, [mergePercent]);

  const onImageLoad = useCallback(() => {
    if (!imageRef.current || !rightCanvasRef.current) return;
    renderImageToCanvas(
      imageRef.current,
      rightCanvasRef.current,
      imageCanvas?.height,
    );
    mergeImages();
  }, [imageCanvas?.height, mergeImages]);

  useEffect(() => {
    mergeImages();
  }, [mergeImages, mergePercent]);

  return (
    <Container>
      <SelectImageButton
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<ImageIcon />}
        onClick={() => imagePickerRef.current?.click()}
      >
        Select image
      </SelectImageButton>

      <FlexBlock>
        <CanvasTitle width={imageCanvas?.width as number}>Image 1</CanvasTitle>
        <CanvasTitle width={imageCanvas?.width as number}>Merged</CanvasTitle>
        <CanvasTitle width={imageCanvas?.width as number}>Image 2</CanvasTitle>
      </FlexBlock>
      <FlexBlock>
        <canvas ref={leftCanvasRef} />
        {imagePath ? (
          <>
            <canvas
              ref={mergedCanvasRef}
              width={imageCanvas?.width}
              height={imageCanvas?.height}
            />
            <canvas
              ref={rightCanvasRef}
              width={imageCanvas?.width}
              height={imageCanvas?.height}
            />
          </>
        ) : (
          <>
            <Paper
              style={{ width: imageCanvas?.width, height: imageCanvas?.height }}
            />
            <Paper
              style={{ width: imageCanvas?.width, height: imageCanvas?.height }}
            />
          </>
        )}
      </FlexBlock>
      <SettingsBlock>
        <StepLabel>Merge percentage</StepLabel>
        <Slider
          disabled={!imagePath}
          defaultValue={50}
          onChange={(event, value) => setMergePercent(value as number)}
        />
      </SettingsBlock>

      {imagePath && (
        <HiddenImage src={imagePath} ref={imageRef} onLoad={onImageLoad} />
      )}
      <ImagePicker ref={imagePickerRef} onChange={setImagePath} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectImageButton = styled(Button)`
  width: 160px;
`;

const Block = styled.div`
  margin: 20px 0;
`;

const FlexBlock = styled(Block)`
  display: flex;
`;

const CanvasTitle = styled(Typography)<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  text-align: center;
`;

const SettingsBlock = styled(Block)`
  width: 200px;
`;

const HiddenImage = styled.img`
  display: none;
`;

export default MergeView;
