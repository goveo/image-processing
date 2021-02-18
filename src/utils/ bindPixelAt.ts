const bindPixelAt = (data: Uint8ClampedArray, width: number) => {
  return (x: number, y: number, i = 0): number => {
    return data[(width * y + x) * 4 + i];
  };
};

export default bindPixelAt;
