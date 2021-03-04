import { MenuItem, Select, Slider, StepLabel } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store/store';
import { ColorComponent } from '../types';
import ColorIntensityFilter from '../utils/filters/colorIntensity';
import getImageDataFromCanvas from '../utils/imageData/getImageDataFromCanvas';
import setImageDataToCanvas from '../utils/imageData/setImageDataToCanvas';

const maxIntensity = 255;

const IntensityView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorComponent, setColorComponent] = useState<ColorComponent>('red');
  const [intensity, setIntensity] = useState<number>(maxIntensity);

  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  const increaseComponentIntensity = useCallback(
    (component: ColorComponent, intensity = maxIntensity) => {
      const canvas = canvasRef.current;
      if (!canvas || !imageCanvas) {
        throw new Error("Can't get canvas");
      }
      canvas.width = imageCanvas.width;
      canvas.height = imageCanvas.height;

      const imageData = getImageDataFromCanvas(imageCanvas);
      const filteredData = ColorIntensityFilter(imageData, {
        colorComponent: component,
        intensity,
      });
      setImageDataToCanvas(canvas, filteredData);
    },
    [imageCanvas],
  );

  useEffect(() => {
    if (imageCanvas) {
      increaseComponentIntensity(colorComponent, intensity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorComponent,
    intensity,
    imageCanvas?.outerHTML,
    increaseComponentIntensity,
  ]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <Block>
        <StepLabel>Color Component</StepLabel>
        <Select
          value={colorComponent}
          onChange={(event) =>
            setColorComponent(event.target.value as ColorComponent)
          }
          fullWidth
        >
          <MenuItem value={'red'}>Red</MenuItem>
          <MenuItem value={'green'}>Green</MenuItem>
          <MenuItem value={'blue'}>Blue</MenuItem>
        </Select>
      </Block>
      <Block>
        <StepLabel>Color Intensity</StepLabel>
        <Slider
          defaultValue={maxIntensity / 2}
          min={0}
          max={maxIntensity}
          onChange={(event, value) => setIntensity(value as number)}
        />
      </Block>
    </div>
  );
};

const Block = styled.div`
  margin: 20px 0;
`;

export default IntensityView;
