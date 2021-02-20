import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { ImageContext } from '../context/image/ImageContext';
import InvertFilter from '../utils/filters/invert';
import getImageDataFromCanvas from '../utils/imageData/getImageDataFromCanvas';
import setImageDataToCanvas from '../utils/imageData/setImageDataToCanvas';

const InvertView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

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
