import { MenuItem, Select, Slider, StepLabel } from '@material-ui/core';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

type ColorComponent = 'red' | 'green' | 'blue';

interface Props {
  imageCanvasRef: RefObject<HTMLCanvasElement>;
}

const IncreaseIntensityWindow: React.FC<Props> = ({ imageCanvasRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorComponent, setColorComponent] = useState<ColorComponent>('red');
  const [intensity, setIntensity] = useState<number>(128);

  const increaseComponentIntensity = useCallback(
    (component: ColorComponent, value = 128) => {
      const canvasContext = canvasRef.current?.getContext('2d');
      const imageCanvasContext = imageCanvasRef.current?.getContext('2d');
      if (
        canvasContext &&
        canvasRef.current &&
        imageCanvasContext &&
        imageCanvasRef.current
      ) {
        const imageData = imageCanvasContext.getImageData(
          0,
          0,
          imageCanvasRef.current.width,
          imageCanvasRef.current.height,
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

        canvasRef.current.height = imageCanvasRef.current.height;
        canvasRef.current.width = imageCanvasRef.current.width;
        canvasContext.putImageData(imageData, 0, 0);
      }
    },
    [imageCanvasRef],
  );

  useEffect(() => {
    if (imageCanvasRef) {
      increaseComponentIntensity(colorComponent, intensity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorComponent,
    intensity,
    imageCanvasRef.current?.outerHTML,
    increaseComponentIntensity,
  ]);

  return (
    <div>
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
          defaultValue={30}
          onChange={(event, value) => setIntensity(value as number)}
        />
      </Block>
      <canvas ref={canvasRef} />
    </div>
  );
};

const Block = styled.div`
  margin: 20px 0;
`;

export default IncreaseIntensityWindow;
