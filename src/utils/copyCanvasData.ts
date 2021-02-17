const copyCanvasData = (
  fromCanvas: HTMLCanvasElement,
  toCanvas: HTMLCanvasElement,
): void => {
  const toCanvasContext = toCanvas.getContext('2d');
  if (!toCanvas || !toCanvasContext || !fromCanvas) return;

  toCanvas.height = fromCanvas.height;
  toCanvas.width = fromCanvas.width;
  toCanvasContext.drawImage(fromCanvas, 0, 0);
};

export default copyCanvasData;
