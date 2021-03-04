import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import InvertFilter from '../utils/filters/invert';
import getImageDataFromCanvas from '../utils/imageData/getImageDataFromCanvas';
import setImageDataToCanvas from '../utils/imageData/setImageDataToCanvas';

const InvertView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  const invertImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageCanvas) {
      throw new Error("Can't get canvas");
    }
    canvas.width = imageCanvas.width;
    canvas.height = imageCanvas.height;

    const imageData = getImageDataFromCanvas(imageCanvas);

    setImageDataToCanvas(canvas, InvertFilter(imageData));
  }, [imageCanvas]);

  useEffect(() => {
    if (imageCanvas) {
      invertImage();
    }
  }, [imageCanvas, imageCanvas?.outerHTML, invertImage]);

  return <canvas ref={canvasRef} />;
};

export default InvertView;
