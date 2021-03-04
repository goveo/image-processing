import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import StepLabel from '@material-ui/core/StepLabel';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { MatrixFilter } from '../types';
import BlurFilter from '../utils/filters/blur';
import DilationFilter from '../utils/filters/dilation';
import ErosionFilter from '../utils/filters/erosion';
import MedianFilter from '../utils/filters/median';
import SharpenFilter from '../utils/filters/sharpen';
import SobelFilter from '../utils/filters/sobel';

const MatrixFiltersView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFilter, setCurrentFilter] = useState<MatrixFilter>(
    MatrixFilter.Sobel,
  );
  const [medianMatrixSize, setMedianMatrixSize] = useState<number>(1);

  const imageCanvas = useSelector<RootState>(
    (state) => state.image.imageCanvas,
  ) as HTMLCanvasElement | null;

  const applyFilter = useCallback(
    (filter: MatrixFilter) => {
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
        case MatrixFilter.Sobel:
          filteredData = SobelFilter(imageData);
          break;
        case MatrixFilter.Median:
          filteredData = MedianFilter(imageData, medianMatrixSize);
          break;
        case MatrixFilter.Sharpen:
          filteredData = SharpenFilter(imageData);
          break;
        case MatrixFilter.Blur:
          filteredData = BlurFilter(imageData);
          break;
        case MatrixFilter.Erosion:
          filteredData = ErosionFilter(imageData);
          break;
        case MatrixFilter.Dilation:
          filteredData = DilationFilter(imageData);
          break;
      }

      canvasContext.putImageData(filteredData, 0, 0);
    },
    [imageCanvas, medianMatrixSize],
  );

  useEffect(() => {
    if (imageCanvas) {
      applyFilter(currentFilter);
    }
  }, [applyFilter, currentFilter, imageCanvas, imageCanvas?.outerHTML]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <StepLabel>Filter</StepLabel>
      <Select
        value={currentFilter}
        onChange={(event) =>
          setCurrentFilter(event.target.value as MatrixFilter)
        }
        fullWidth
      >
        <MenuItem value={MatrixFilter.Sobel}>Sobel</MenuItem>
        <MenuItem value={MatrixFilter.Median}>Median</MenuItem>
        <MenuItem value={MatrixFilter.Sharpen}>Sharpen</MenuItem>
        <MenuItem value={MatrixFilter.Blur}>Blur</MenuItem>
        <MenuItem value={MatrixFilter.Erosion}>Erosion</MenuItem>
        <MenuItem value={MatrixFilter.Dilation}>Dilation</MenuItem>
      </Select>

      {currentFilter === 'median' && (
        <>
          <StepLabel>Median matrix value</StepLabel>
          <Slider
            value={medianMatrixSize}
            valueLabelDisplay="auto"
            marks
            min={1}
            max={4}
            step={1}
            onChange={(event, value) => setMedianMatrixSize(value as number)}
          />
        </>
      )}
    </div>
  );
};

export default MatrixFiltersView;
