const setImageDataToCanvas = (
  canvas: HTMLCanvasElement,
  imageData: ImageData,
): void => {
  const canvasContext = canvas.getContext('2d');
  canvasContext?.putImageData(imageData, 0, 0);
};

export default setImageDataToCanvas;
