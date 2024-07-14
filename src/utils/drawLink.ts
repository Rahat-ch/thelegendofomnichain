// utils/drawLink.ts
import collision from '@/utils/collision';

const drawLink = (
  ctx: CanvasRenderingContext2D,
  link1: HTMLImageElement,
  hud: HTMLImageElement,
  linkX: number,
  linkY: number,
  currentAnimation: number,
  animationCounter: number,
  playPickUpItemAnimation: boolean,
  lastPickUpItem: number,
  rightPressed: boolean,
  leftPressed: boolean,
  upPressed: boolean,
  downPressed: boolean,
  lastButtonPressed: string,
  gameMap: number[][],
  swordEquipped: number,
  setLinkX: (x: number) => void,
  setLinkY: (y: number) => void
) => {
  let speed = 2;
  animationCounter++;
  if (playPickUpItemAnimation) {
    animationCounter++;
    if (animationCounter < 300) {
      ctx.drawImage(link1, 1, 150, 16, 16, linkX, linkY, 16, 16);
    } else {
      playPickUpItemAnimation = false;
    }
    switch (lastPickUpItem) {
      case 14:
        ctx.drawImage(hud, 555, 137, 8, 16, linkX - 2, linkY - 14, 8, 16);
        break;
    }
  } else {
    if (leftPressed && !collision(linkX - speed, linkY, gameMap)) {
      setLinkX(linkX - speed);
      if (currentAnimation === 0) {
        ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
      } else if (currentAnimation === 1) {
        ctx.drawImage(link1, 30, 30, 16, 16, linkX, linkY, 16, 16);
      }
      if (animationCounter >= 6) {
        currentAnimation++;
        animationCounter = 0;
        if (currentAnimation > 1) {
          currentAnimation = 0;
        }
      }
    } else if (rightPressed && !collision(linkX + speed, linkY, gameMap)) {
      setLinkX(linkX + speed);
      if (currentAnimation === 0) {
        ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
      } else if (currentAnimation === 1) {
        ctx.drawImage(link1, 91, 30, 16, 16, linkX, linkY, 16, 16);
      }
      if (animationCounter >= 6) {
        currentAnimation++;
        animationCounter = 0;
        if (currentAnimation > 1) {
          currentAnimation = 0;
        }
      }
    } else if (upPressed && !collision(linkX, linkY - speed, gameMap)) {
      setLinkY(linkY - speed);
      if (currentAnimation === 0) {
        ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
      } else if (currentAnimation === 1) {
        ctx.drawImage(link1, 62, 30, 16, 16, linkX, linkY, 16, 16);
      }
      if (animationCounter >= 6) {
        currentAnimation++;
        animationCounter = 0;
        if (currentAnimation > 1) {
          currentAnimation = 0;
        }
      }
    } else if (downPressed && !collision(linkX, linkY + speed, gameMap)) {
      setLinkY(linkY + speed);
      if (currentAnimation === 0) {
        ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
      } else if (currentAnimation === 1) {
        ctx.drawImage(link1, 0, 30, 16, 16, linkX, linkY, 16, 16);
      }
      if (animationCounter >= 6) {
        currentAnimation++;
        animationCounter = 0;
        if (currentAnimation > 1) {
          currentAnimation = 0;
        }
      }
    } else {
      if (lastButtonPressed === 'down') {
        ctx.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
      }
      if (lastButtonPressed === 'up') {
        ctx.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
      }
      if (lastButtonPressed === 'left') {
        ctx.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
      }
      if (lastButtonPressed === 'right') {
        ctx.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
      }
    }
  }
};

export default drawLink;
