import React, { useContext, useEffect, useRef } from 'react';

import { ImageContext } from '../context/image/ImageContext';
import copyCanvasData from '../utils/copyCanvasData';

const DefaultView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  useEffect(() => {
    if (!imageCanvas || !canvasRef.current) return;

    copyCanvasData(imageCanvas, canvasRef.current);
  }, [imageCanvas]);

  return <canvas ref={canvasRef} />;
};

export default DefaultView;
