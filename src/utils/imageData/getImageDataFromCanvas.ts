const getImageDataFromCanvas = (canvas: HTMLCanvasElement): ImageData => {
  const canvasContext = canvas.getContext('2d');
  const imageData = canvasContext?.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  if (!imageData) {
    throw new Error("Can't get image data from canvas");
  }

  return imageData;
};

export default getImageDataFromCanvas;
