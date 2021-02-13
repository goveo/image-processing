import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { ImageContext } from '../context/image/ImageContext';

const InvertWindow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageCanvas } = useContext(ImageContext);

  const invertImage = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    const imageCanvasContext = imageCanvas?.getContext('2d');
    if (
      canvasContext &&
      canvasRef.current &&
      imageCanvasContext &&
      imageCanvas
    ) {
      const imageData = imageCanvasContext.getImageData(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height,
      );

      for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
          const i = x * 4 + y * imageData.width * 4;
          imageData.data[i] = imageData.data[i] ^ 255; // Red
          imageData.data[i + 1] = imageData.data[i + 1] ^ 255; // Green
          imageData.data[i + 2] = imageData.data[i + 2] ^ 255; // Blue
        }
      }

      canvasRef.current.height = imageCanvas.height;
      canvasRef.current.width = imageCanvas.width;
      canvasContext.putImageData(imageData, 0, 0);
    }
  }, [imageCanvas]);

  useEffect(() => {
    if (imageCanvas) {
      invertImage();
    }
  }, [imageCanvas, imageCanvas?.outerHTML, invertImage]);

  return <canvas ref={canvasRef} />;
};

export default InvertWindow;
