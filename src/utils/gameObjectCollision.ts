// utils/gameObjectCollision.ts
import { GameObject, MapBundle, sounds } from '@/constants';
import playSound from '@/utils/playSound';

const gameObjectCollision = (
  x: number,
  y: number,
  objects: GameObject[],
  isLink: boolean,
  maps: MapBundle[],
  linkX: number,
  linkY: number,
  playPickUpItemAnimation: boolean,
  lastPickUpItem: number,
  animationCounter: number,
  gameMap: number[][],
  gameObjects: GameObject[],
  swordEquipped: number
) => {
  if (isLink) {
    for (let i = 0; i < objects.length; i++) {
      if (
        x <= objects[i].x + objects[i].width &&
        x + 16 >= objects[i].x &&
        y <= objects[i].y + objects[i].height &&
        y + 16 >= objects[i].y
      ) {
        if (objects[i].isPortal) {
          gameMap = maps[objects[i].newMap].map;
          gameObjects = maps[objects[i].newMap].gameObjects;
          linkX = objects[i].newLinkX;
          linkY = objects[i].newLinkY;
        }

        if (objects[i].isPickUpItem) {
          playPickUpItemAnimation = true;
          lastPickUpItem = objects[i].pickUpItemNum!;
          objects.splice(i, 1);
          animationCounter = 0;
          playSound(sounds.item);
        }
      }
    }
  }
};

export default gameObjectCollision;
