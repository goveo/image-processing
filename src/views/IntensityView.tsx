import { MenuItem, Select, Slider, StepLabel } from '@material-ui/core';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { ImageContext } from '../context/image/ImageContext';
import { ColorComponent } from '../types';

const maxIntensity = 255;

const IntensityView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorComponent, setColorComponent] = useState<ColorComponent>('red');
  const [intensity, setIntensity] = useState<number>(maxIntensity);

  const { imageCanvas } = useContext(ImageContext);

  const increaseComponentIntensity = useCallback(
    (component: ColorComponent, value = maxIntensity) => {
      const canvasContext = canvasRef.current?.getContext('2d');
      const imageCanvasContext = imageCanvas?.getContext('2d');
      if (
        canvasContext &&
        canvasRef.current &&
        imageCanvasContext &&
        imageCanvas
      ) {
        const imageData = imageCanvasContext.getImageData(
          0,
          0,
          imageCanvas.width,
          imageCanvas.height,
        );

        for (let y = 0; y < imageData.height; y++) {
          for (let x = 0; x < imageData.width; x++) {
            const i = x * 4 + y * imageData.width * 4;

            const redIndex = i;
            const greenIndex = i + 1;
            const blueIndex = i + 2;
            switch (component) {
              case 'red':
                imageData.data[redIndex] = imageData.data[redIndex] + value;
                break;
              case 'green':
                imageData.data[greenIndex] = imageData.data[greenIndex] + value;
                break;
              case 'blue':
                imageData.data[blueIndex] = imageData.data[blueIndex] + value;
                break;
            }
          }
        }

        canvasRef.current.height = imageCanvas.height;
        canvasRef.current.width = imageCanvas.width;
        canvasContext.putImageData(imageData, 0, 0);
      }
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
