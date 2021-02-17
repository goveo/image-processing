const renderImageToCanvas = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  canvasHeight?: number,
): void => {
  const canvasContext = canvas?.getContext('2d');
  if (canvasContext && image && canvas) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if (canvasHeight) {
      const canvasMultiplier = canvasHeight / image.height;
      const canvasWidth = image.width * canvasMultiplier;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
    } else {
      canvas.height = image.height;
      canvas.width = image.width;
    }
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
};

export default renderImageToCanvas;
