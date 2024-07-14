// utils/collision.ts
const collision = (x: number, y: number, map: number[][]): boolean => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== 2 && map[i][j] !== 28) {
        if (
          x <= j * 16 + 16 &&
          x + 12 >= j * 16 &&
          y + 10 <= i * 16 + 16 &&
          y + 16 >= i * 16
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export default collision;
