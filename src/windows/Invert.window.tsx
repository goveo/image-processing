import React, { RefObject, useCallback, useEffect, useRef } from 'react';

interface Props {
  imageCanvasRef: RefObject<HTMLCanvasElement>;
}

const InvertWindow: React.FC<Props> = ({ imageCanvasRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const invertImage = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    const imageCanvasContext = imageCanvasRef.current?.getContext('2d');
    if (
      canvasContext &&
      canvasRef.current &&
      imageCanvasContext &&
      imageCanvasRef.current
    ) {
      const imageData = imageCanvasContext.getImageData(
        0,
        0,
        imageCanvasRef.current.width,
        imageCanvasRef.current.height,
      );

      for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
          const i = x * 4 + y * imageData.width * 4;
          imageData.data[i] = imageData.data[i] ^ 255; // Red
          imageData.data[i + 1] = imageData.data[i + 1] ^ 255; // Green
          imageData.data[i + 2] = imageData.data[i + 2] ^ 255; // Blue
        }
      }

      canvasRef.current.height = imageCanvasRef.current.height;
      canvasRef.current.width = imageCanvasRef.current.width;
      canvasContext.putImageData(imageData, 0, 0);
    }
  }, [imageCanvasRef]);

  useEffect(() => {
    if (imageCanvasRef) {
      invertImage();
    }
  }, [imageCanvasRef, imageCanvasRef.current?.outerHTML, invertImage]);

  return <canvas ref={canvasRef} />;
};

export default InvertWindow;
