import { Container } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import NavigationBar from './components/NavigationBar';
import { ImageContext } from './context/image/ImageContext';
import { Routes } from './routes';
import DefaultView from './views/DefaultView';
import InvertView from './views/InvertView';
import IntensityView from './views/IntensityView';
import SelectImageView from './views/SelectImageView';

const canvasHeight = 200;

const AppContainer: React.FC = () => {
  const { imagePath, setImageCanvas } = useContext(ImageContext);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setImageCanvas(canvasRef.current);
  }, [canvasRef, setImageCanvas]);

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

  const onImageLoad = useCallback(() => {
    renderImageToCanvas();
    setImageCanvas(canvasRef.current);
  }, [renderImageToCanvas, setImageCanvas]);

  return (
    <HashRouter>
      {imagePath ? (
        <>
          <NavigationBar />
          <Container>
            {imagePath && (
              <ImagePreviewContainer>
                <Image
                  ref={imageRef}
                  src={imagePath}
                  height={canvasHeight}
                  onLoad={onImageLoad}
                />
                <Canvas ref={canvasRef} />
              </ImagePreviewContainer>
            )}

            <ImagePreviewContainer>
              <Switch>
                <Route path={Routes.INVERT.path} component={InvertView} />
                <Route path={Routes.INTENSITY.path} component={IntensityView} />
                <Route path={Routes.DEFAULT.path} component={DefaultView} />
              </Switch>
            </ImagePreviewContainer>
          </Container>
        </>
      ) : (
        <SelectImageView />
      )}
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

export default AppContainer;
