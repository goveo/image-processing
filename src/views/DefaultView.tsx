import React, { useContext, useEffect, useRef } from 'react';

import { ImageContext } from '../context/image/ImageContext';

const DefaultView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (canvasRef.current && canvasContext && imageCanvas) {
      canvasRef.current.height = imageCanvas.height;
      canvasRef.current.width = imageCanvas.width;
      canvasContext.drawImage(imageCanvas, 0, 0);
    }
  }, [imageCanvas]);

  return <canvas ref={canvasRef} />;
};

export default DefaultView;
