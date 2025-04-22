export const colorGenerator = (count: number): string[] => {
  const colors = new Set<string>();
  let hue = Math.random() * 360;

  while (colors.size < count) {
    hue = (hue + 137.508) % 360;
    const saturation = 60 + Math.random() * 20;
    const lightness = 75 + Math.random() * 10;

    const color = `hsl(${hue.toFixed(0)}, ${saturation.toFixed(
      0
    )}%, ${lightness.toFixed(0)}%)`;
    colors.add(color);
  }

  return Array.from(colors);
};
