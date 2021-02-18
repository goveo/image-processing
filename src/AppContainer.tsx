import MaterialContainer from '@material-ui/core/Container';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ImagePicker from './components/ImagePicker';
import NavigationBar from './components/NavigationBar';
import { ImageContext } from './context/image/ImageContext';
import { MenuActions } from './enums';
import { Routes } from './routes';
import renderImageToCanvas from './utils/renderImageToCanvas';
import SelectImageView from './views/SelectImageView';

const canvasHeight = 200;

const AppContainer: React.FC = () => {
  const { imagePath, setImageCanvas, setImagePath } = useContext(ImageContext);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageCanvas(canvasRef.current);
  }, [canvasRef, setImageCanvas]);

  const onImageLoad = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;
    renderImageToCanvas(imageRef.current, canvasRef.current);
    setImageCanvas(canvasRef.current);
  }, [setImageCanvas]);

  useEffect(() => {
    window.require('electron').ipcRenderer.on(MenuActions.OpenFile, () => {
      inputRef.current?.click();
    });
  }, []);

  return (
    <Container>
      <HashRouter>
        <ImagePicker ref={inputRef} onChange={setImagePath} />

        {imagePath ? (
          <>
            <NavigationBar />
            <MaterialContainer>
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
                  {Object.values(Routes)
                    .map(({ path, component: Component }) => (
                      <Route
                        key={path}
                        path={path}
                        render={() => <Component />}
                      />
                    ))
                    .reverse()}
                </Switch>
              </ImagePreviewContainer>
            </MaterialContainer>
          </>
        ) : (
          <SelectImageView />
        )}
      </HashRouter>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

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
  display: none;
`;

export default AppContainer;
