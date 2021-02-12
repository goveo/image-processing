import React, { RefObject, useEffect, useRef } from 'react';

interface Props {
  imageCanvasRef: RefObject<HTMLCanvasElement>;
}

const DefaultWindow: React.FC<Props> = ({ imageCanvasRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (canvasRef.current && canvasContext && imageCanvasRef.current) {
      canvasRef.current.height = imageCanvasRef.current.height;
      canvasRef.current.width = imageCanvasRef.current.width;
      canvasContext.drawImage(imageCanvasRef.current, 0, 0);
    }
  }, [imageCanvasRef]);

  return <canvas ref={canvasRef} />;
};

export default DefaultWindow;
