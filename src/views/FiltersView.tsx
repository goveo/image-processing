import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import StepLabel from '@material-ui/core/StepLabel';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ImageContext } from '../context/image/ImageContext';
import { Filter } from '../types';
import BlurFilter from '../utils/filters/blur';
import DilationFilter from '../utils/filters/dilation';
import ErosionFilter from '../utils/filters/erosion';
import MedianFilter from '../utils/filters/median';
import SharpenFilter from '../utils/filters/sharpen';
import SobelFilter from '../utils/filters/sobel';

const FiltersView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFilter, setCurrentFilter] = useState<Filter>('sobel');
  const [medianMatrixSize, setMedianMatrixSize] = useState<number>(1);

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
        case 'median':
          filteredData = MedianFilter(imageData, medianMatrixSize);
          break;
        case 'sharpen':
          filteredData = SharpenFilter(imageData);
          break;
        case 'blur':
          filteredData = BlurFilter(imageData);
          break;
        case 'erosion':
          filteredData = ErosionFilter(imageData);
          break;
        case 'dilation':
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
        onChange={(event) => setCurrentFilter(event.target.value as Filter)}
        fullWidth
      >
        <MenuItem value={'sobel'}>Sobel</MenuItem>
        <MenuItem value={'median'}>Median</MenuItem>
        <MenuItem value={'sharpen'}>Sharpen</MenuItem>
        <MenuItem value={'blur'}>Blur</MenuItem>
        <MenuItem value={'erosion'}>Erosion</MenuItem>
        <MenuItem value={'dilation'}>Dilation</MenuItem>
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

export default FiltersView;
