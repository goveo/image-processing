import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { ImageContext } from '../context/image/ImageContext';
import getPixelsFromCanvas from '../utils/getPixelsFromCanvas';

const InvertView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  const invertImage = useCallback(() => {
    if (!imageCanvas || !canvasRef.current) return;
    const canvasPixelIterator = getPixelsFromCanvas(
      imageCanvas,
      canvasRef.current,
    );
    let pixelData = canvasPixelIterator.next();
    while (!pixelData.done) {
      const { red, green, blue, setRed, setBlue, setGreen } = pixelData.value;
      setRed(red ^ 255);
      setGreen(green ^ 255);
      setBlue(blue ^ 255);
      pixelData = canvasPixelIterator.next();
    }
  }, [imageCanvas]);

  useEffect(() => {
    if (imageCanvas) {
      invertImage();
    }
  }, [imageCanvas, imageCanvas?.outerHTML, invertImage]);

  return <canvas ref={canvasRef} />;
};

export default InvertView;
