// utils/drawMap.ts
const drawMap = (ctx: CanvasRenderingContext2D, worldTiles: HTMLImageElement, level: number[][]) => {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      ctx.drawImage(
        worldTiles,
        ((level[i][j] % 18) * 17) + 1,
        Math.floor(level[i][j] / 18) * 17 + 1,
        16,
        16,
        j * 16,
        i * 16,
        16,
        16
      );
    }
  }
};

export default drawMap;
