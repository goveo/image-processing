import { Container } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ImagePicker from './components/ImagePicker';
import NavigationBar from './components/NavigationBar';
import { Routes } from './routes';
import InvertWindow from './windows/Invert.window';
import MainWindow from './windows/Default.window';
import IncreaseIntensityWindow from './windows/IncreaseIntensity.window';

const canvasHeight = 200;

const App: React.FC = () => {
  const [imagePath, setImagePath] = useState<string>();
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderImageToCanvas = useCallback((): void => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const canvasContext = canvas?.getContext('2d');
    if (canvasContext && image && canvas) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      const canvasMultiplier = canvasHeight / image.height;
      const canvasWidth = image.width * canvasMultiplier;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      canvasContext.drawImage(image, 0, 0, image.width, image.height);
    }
  }, []);

  return (
    <HashRouter>
      <NavigationBar />
      <Container>
        <ImagePicker onChange={setImagePath} />

        {imagePath && (
          <ImagePreviewContainer>
            <Image
              ref={imageRef}
              src={imagePath}
              height={canvasHeight}
              onLoad={renderImageToCanvas}
            />
            <Canvas ref={canvasRef} />
          </ImagePreviewContainer>
        )}

        <ImagePreviewContainer>
          <Switch>
            <Route
              path={Routes.INVERT.path}
              render={() => <InvertWindow imageCanvasRef={canvasRef} />}
            />
            <Route
              path={Routes.INTENSITY.path}
              render={() => (
                <IncreaseIntensityWindow imageCanvasRef={canvasRef} />
              )}
            />
            <Route
              path={Routes.DEFAULT.path}
              render={() => <MainWindow imageCanvasRef={canvasRef} />}
            />
          </Switch>
        </ImagePreviewContainer>
      </Container>
    </HashRouter>
  );
};

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Image = styled.img`
  position: absolute;
  visibility: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  visibility: hidden;
`;

export default App;
