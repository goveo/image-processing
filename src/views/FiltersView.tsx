import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ImageContext } from '../context/image/ImageContext';
import { Filter } from '../types';
import SobelFilter from '../utils/filters/sobel';

const FiltersView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFilter, setCurrentFilter] = useState<Filter>('sobel');

  const { imageCanvas } = useContext(ImageContext);

  const applyFilter = useCallback(
    (filter: Filter) => {
      if (!imageCanvas || !canvasRef.current) return;
      canvasRef.current.width = imageCanvas.width;
      canvasRef.current.height = imageCanvas.height;

      const canvasContext = canvasRef.current.getContext('2d');
      const imageCanvasContext = imageCanvas.getContext('2d');

      if (!canvasContext || !imageCanvas || !imageCanvasContext) {
        throw new Error("Can't get canvas context");
      }

      const imageData = imageCanvasContext.getImageData(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height,
      );

      let filteredData: ImageData;
      switch (filter) {
        case 'sobel':
          filteredData = SobelFilter(imageData);
          break;
      }

      canvasContext.putImageData(filteredData, 0, 0);
    },
    [imageCanvas],
  );

  useEffect(() => {
    if (imageCanvas) {
      applyFilter(currentFilter);
    }
  }, [applyFilter, currentFilter, imageCanvas, imageCanvas?.outerHTML]);

  return <canvas ref={canvasRef} />;
};

export default FiltersView;
