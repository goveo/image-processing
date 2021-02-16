import React, {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

import { ImageContext } from '../context/image/ImageContext';
import { ColorComponent } from '../types';
import getPixelsFromCanvas from '../utils/getPixelsFromCanvas';

const ColorComponentsView: React.FC = () => {
  const redCanvasRef = useRef<HTMLCanvasElement>(null);
  const greenCanvasRef = useRef<HTMLCanvasElement>(null);
  const blueCanvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  const increaseComponentIntensity = useCallback(
    (canvasRef: RefObject<HTMLCanvasElement>, component: ColorComponent) => {
      if (!imageCanvas || !canvasRef.current) return;

      const canvasPixelIterator = getPixelsFromCanvas(
        imageCanvas,
        canvasRef.current,
      );
      let pixelData = canvasPixelIterator.next();
      while (!pixelData.done) {
        const { setRed, setBlue, setGreen } = pixelData.value;
        switch (component) {
          case 'red':
            setGreen(0);
            setBlue(0);
            break;
          case 'green':
            setRed(0);
            setBlue(0);
            break;
          case 'blue':
            setRed(0);
            setGreen(0);
            break;
        }
        pixelData = canvasPixelIterator.next();
      }
    },
    [imageCanvas],
  );

  useEffect(() => {
    if (imageCanvas) {
      increaseComponentIntensity(redCanvasRef, 'red');
      increaseComponentIntensity(greenCanvasRef, 'green');
      increaseComponentIntensity(blueCanvasRef, 'blue');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageCanvas?.outerHTML, increaseComponentIntensity]);

  return (
    <Container>
      <canvas ref={redCanvasRef} />
      <canvas ref={greenCanvasRef} />
      <canvas ref={blueCanvasRef} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default ColorComponentsView;
