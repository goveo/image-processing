import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import copyCanvasData from '../utils/copyCanvasData';

const DefaultView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  useEffect(() => {
    if (!imageCanvas || !canvasRef.current) return;

    copyCanvasData(imageCanvas, canvasRef.current);
  }, [imageCanvas]);

  return <canvas ref={canvasRef} />;
};

export default DefaultView;
