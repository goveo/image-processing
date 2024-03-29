import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store/store';
import { ColorComponent } from '../types';
import ColorComponentFilter from '../utils/filters/colorComponent';
import getImageDataFromCanvas from '../utils/imageData/getImageDataFromCanvas';
import setImageDataToCanvas from '../utils/imageData/setImageDataToCanvas';

const ColorComponentsView: React.FC = () => {
  const redCanvasRef = useRef<HTMLCanvasElement>(null);
  const greenCanvasRef = useRef<HTMLCanvasElement>(null);
  const blueCanvasRef = useRef<HTMLCanvasElement>(null);

  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  const increaseComponentIntensity = useCallback(
    (canvasRef: RefObject<HTMLCanvasElement>, component: ColorComponent) => {
      const canvas = canvasRef.current;
      if (!canvas || !imageCanvas) {
        throw new Error("Can't get canvas");
      }
      canvas.width = imageCanvas.width;
      canvas.height = imageCanvas.height;
      const imageData = getImageDataFromCanvas(imageCanvas);

      const filteredData = ColorComponentFilter(imageData, component);
      setImageDataToCanvas(canvas, filteredData);
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
