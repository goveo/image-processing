import MaterialContainer from '@material-ui/core/Container';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ImagePicker from './components/ImagePicker';
import NavigationBar from './components/NavigationBar';
import { MenuActions } from './enums';
import { Routes } from './routes';
import { ImagePath } from './store/models/image.model';
import { RootState, store } from './store/store';
import renderImageToCanvas from './utils/renderImageToCanvas';
import SelectImageView from './views/SelectImageView';

const canvasHeight = 300;

const AppContainer: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const imagePath = useSelector<RootState>(
    (state) => state.image.imagePath,
  ) as ImagePath;
  const history = useHistory();

  const onImageLoad = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;
    renderImageToCanvas(imageRef.current, canvasRef.current);
    store.dispatch.image.setImageCanvas(canvasRef.current);
    history.push('/');
  }, [history]);

  useEffect(() => {
    window.require('electron').ipcRenderer.on(MenuActions.OpenFile, () => {
      inputRef.current?.click();
    });
  }, []);

  const handleImagePick = useCallback((imagePath: ImagePath) => {
    store.dispatch.image.setImagePath(imagePath);
  }, []);

  return (
    <Container>
      <ImagePicker ref={inputRef} onChange={handleImagePick} />

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
