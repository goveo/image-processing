import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ImagePicker from '../components/ImagePicker';
import { ImagePath } from '../store/models/image.model';
import { RootState } from '../store/store';
import bindPixelAt from '../utils/bindPixelAt';
import copyCanvasData from '../utils/copyCanvasData';
import BinaryFilter from '../utils/filters/binary';
import getPixelIterator from '../utils/getPixelIterator';
import renderImageToCanvas from '../utils/renderImageToCanvas';

const SteganographyView: React.FC = () => {
  const [imagePath, setImagePath] = useState<ImagePath>(null);

  const imagePickerRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  useEffect(() => {
    if (!imageCanvas || !originalCanvasRef.current) return;
    copyCanvasData(imageCanvas, originalCanvasRef.current);
  }, [imageCanvas]);

  const processImages = useCallback(() => {
    const originalCanvas = originalCanvasRef.current;
    const watermarkCanvas = watermarkCanvasRef.current;
    const resultCanvas = resultCanvasRef.current;
    const originalCanvasContext = originalCanvas?.getContext('2d');
    const watermarkCanvasContext = watermarkCanvas?.getContext('2d');
    const resultCanvasContext = resultCanvas?.getContext('2d');
    if (
      !originalCanvas ||
      !watermarkCanvas ||
      !resultCanvas ||
      !originalCanvasContext ||
      !watermarkCanvasContext ||
      !resultCanvasContext
    )
      return;

    resultCanvas.width = originalCanvas.width;
    resultCanvas.height = originalCanvas.height;

    const originalImageData = originalCanvasContext.getImageData(
      0,
      0,
      originalCanvas.width,
      originalCanvas.height,
    );
    const watermarkImageData = watermarkCanvasContext.getImageData(
      0,
      0,
      watermarkCanvas.width, // cut image with left canvas dimensions
      watermarkCanvas.height,
    );

    const binaryWatermarkImageData = BinaryFilter(watermarkImageData);
    // watermarkCanvasContext.putImageData(binaryWatermarkImageData, 0, 0);

    const pixels: number[] = [];

    const getWatermarkPixel = bindPixelAt(binaryWatermarkImageData);

    const pixelIterator = getPixelIterator(originalImageData);

    let pixelData = pixelIterator.next();
    while (!pixelData.done) {
      const { x, y, red, green, blue, alpha } = pixelData.value;
      const watermarkValue = getWatermarkPixel(x, y).alpha > 128 ? 1 : 0;

      const binaryBlueString = blue.toString(2);
      const resultBlue = parseInt(
        `${binaryBlueString.slice(0, -1)}${watermarkValue}`,
        2,
      );

      pixels.push(red, green, resultBlue, alpha);

      pixelData = pixelIterator.next();
    }

    const resultImageData = new ImageData(
      new Uint8ClampedArray(pixels),
      originalImageData.width,
      originalImageData.height,
    );
    resultCanvasContext.putImageData(resultImageData, 0, 0);
  }, []);

  const onImageLoad = useCallback(() => {
    if (!imageRef.current || !watermarkCanvasRef.current) return;
    renderImageToCanvas(
      imageRef.current,
      watermarkCanvasRef.current,
      imageCanvas?.height,
      'repeat',
    );
    processImages();
  }, [imageCanvas?.height, processImages]);

  useEffect(() => {
    processImages();
  }, [processImages]);

  return (
    <Container>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<ImageIcon />}
        onClick={() => imagePickerRef.current?.click()}
      >
        Select watermark
      </Button>

      <FlexBlock>
        <CanvasTitle width={imageCanvas?.width as number}>
          Original image
        </CanvasTitle>
        <CanvasTitle width={imageCanvas?.width as number}>Result</CanvasTitle>
        <CanvasTitle width={imageCanvas?.width as number}>
          Watermark
        </CanvasTitle>
      </FlexBlock>
      <FlexBlock>
        <canvas ref={originalCanvasRef} />
        {imagePath ? (
          <>
            <canvas
              ref={resultCanvasRef}
              width={imageCanvas?.width}
              height={imageCanvas?.height}
            />
            <canvas
              ref={watermarkCanvasRef}
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

const HiddenImage = styled.img`
  display: none;
`;

export default SteganographyView;
