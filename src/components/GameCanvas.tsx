import { useEffect, useRef, useState } from 'react';
import { map7_7, mapWoodSword, fps, GameObject, MapBundle, sounds, enemiesSrc } from '@/constants';
import drawHUD from '@/utils/drawHud';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const objects7_7: GameObject[] = [];
  const objectsWoodSword: GameObject[] = [];

  let gameObjects: GameObject[] = [];
  let maps: MapBundle[] = [];
  let gameMap: number[][] | null = null;

  // State variables
  const [linkHearts, setLinkHearts] = useState<number>(14);
  const [currentLinkHearts, setCurrentLinkHearts] = useState<number>(14);
  const [rupeeAmount, setRupeeAmount] = useState<number>(0);
  const [keyAmount, setKeyAmount] = useState<number>(1);
  const [bombAmount, setBombAmount] = useState<number>(3);
  const [swordEquipped, setSwordEquipped] = useState<number>(0);

  let hasSword = false;
  let isAttacking = false;
  let canAttackAgain = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    document.body.style.zoom = '288%';

    let worldTiles = new Image();
    worldTiles.src = '/compound.png';

    let link1 = new Image();
    link1.src = '/link.png';

    let chars1 = new Image();
    chars1.src = '/chars.png';

    let chars2 = new Image();
    chars2.src = '/chars2.png';

    let hud = new Image();
    hud.src = '/pausescreen.png';

    let enemies = new Image();
    enemies.src = enemiesSrc;

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;

    let animationCounter = 0;
    let currentAnimation = 0;
    let lastButtonPressed = 'up';
    let linkY = 135;
    let linkX = 116;

    let lastPickUpItem = 0;
    let playPickUpItemAnimation = false;

    const playSound = (source: string) => {
      let sound = new Audio(source);
      sound.play();
    };

    const gO1: GameObject = {
      x: 72,
      y: 72,
      width: 8,
      height: 16,
      newMap: 1,
      newLinkX: 120,
      newLinkY: 220,
      isPortal: true,
    };
    objects7_7.push(gO1);

    const gO2: GameObject = {
      x: 112,
      y: 240,
      width: 16,
      height: 16,
      newMap: 0,
      newLinkX: 68,
      newLinkY: 96,
      isPortal: true,
    };
    objectsWoodSword.push(gO2);

    const gO3: GameObject = {
      x: 128,
      y: 240,
      width: 16,
      height: 16,
      newMap: 0,
      newLinkX: 68,
      newLinkY: 96,
      isPortal: true,
    };
    objectsWoodSword.push(gO3);

    // Added old man, flames, and text
    const gO4: GameObject = {
      x: (4 * 16) + 8,
      y: (8 * 16),
      width: 16,
      height: 16,
      isFlame: true,
      counter: 0,
      imageNum: 0,
    };
    objectsWoodSword.push(gO4);

    const gO5: GameObject = {
      x: (10 * 16) + 8,
      y: (8 * 16),
      width: 16,
      height: 16,
      isFlame: true,
      counter: 0,
      imageNum: 0,
    };
    objectsWoodSword.push(gO5);

    const gO6: GameObject = {
      x: (7 * 16) + 8,
      y: (8 * 16),
      width: 16,
      height: 16,
      isOldMan: true,
    };
    objectsWoodSword.push(gO6);

    const gO7: GameObject = {
      isText: true,
      line1Full: "DON'T GET RUGGED TAKE",
      line2Full: "THIS PROTECT YOUR KEYS",
      line1Current: "",
      line2Current: "",
      line1X: 3 * 16,
      line1Y: 7 * 16,
      line2X: 4 * 16,
      line2Y: (8 * 16) - 6,
      counter: 0,
    };
    objectsWoodSword.push(gO7);

    const gO8: GameObject = {
      x: (8 * 16) - 4,
      y: (9.5 * 16),
      width: 8,
      height: 16,
      isPickUpItem: true,
      pickUpItemNum: 14,
    };
    objectsWoodSword.push(gO8);

    // Adding an enemy object
    const gO9: GameObject = {
      x: 160,
      y: 184,
      width: 16,
      height: 16,
      isEnemy: true,
      enemyType: 1,
      direction: 'left',
      counter: 0,
      frame: 0,
      health: 5,  // Set initial health to 5
    };
    objects7_7.push(gO9);

    const bundle1: MapBundle = { map: map7_7, gameObjects: objects7_7 };
    const bundle2: MapBundle = { map: mapWoodSword, gameObjects: objectsWoodSword };

    maps.push(bundle1);
    maps.push(bundle2);

    gameMap = maps[0].map;
    gameObjects = maps[0].gameObjects;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        leftPressed = true;
        lastButtonPressed = 'left';
      } else if (e.key === 'ArrowRight') {
        rightPressed = true;
        lastButtonPressed = 'right';
      } else if (e.key === 'ArrowUp') {
        upPressed = true;
        lastButtonPressed = 'up';
      } else if (e.key === 'ArrowDown') {
        downPressed = true;
        lastButtonPressed = 'down';
      }
      if (e.key === 'a' && canAttackAgain) {
        isAttacking = true;
        currentAnimation = 0;
        canAttackAgain = false;
        playSound(sounds.swordSlash);
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a'].includes(e.key)) {
        e.preventDefault();
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        leftPressed = false;
      } else if (e.key === 'ArrowRight') {
        rightPressed = false;
      } else if (e.key === 'ArrowUp') {
        upPressed = false;
      } else if (e.key === 'ArrowDown') {
        downPressed = false;
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

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

    const gameObjectCollision = (x: number, y: number, objects: GameObject[], isLink: boolean, isSword: boolean = false) => {
      if (isLink) {
        for (let i = 0; i < objects.length; i++) {
          if (
            x <= objects[i].x + objects[i].width &&
            x + 16 >= objects[i].x &&
            y <= objects[i].y + objects[i].height &&
            y + 16 >= objects[i].y
          ) {
            if (objects[i].isPortal) {
              gameMap = maps[objects[i].newMap!].map;
              gameObjects = maps[objects[i].newMap!].gameObjects;
              linkX = objects[i].newLinkX!;
              linkY = objects[i].newLinkY!;
            }

            if (objects[i].isPickUpItem) {
              playPickUpItemAnimation = true;
              lastPickUpItem = objects[i].pickUpItemNum!;
              objects.splice(i, 1);
              animationCounter = 0;
              playSound(sounds.item);
              if (lastPickUpItem === 14) {
                setSwordEquipped(1);
                hasSword = true;
              }
            }
          }
        }
      } else if (isSword) {
        let swordW = 11;
        let swordH = 3;
        if (lastButtonPressed === "up" || lastButtonPressed === "down") {
          swordW = 3;
          swordH = 11;
        }
        for (let i = 0; i < objects.length; i++) {
          if (
            x <= objects[i].x + objects[i].width &&
            x + swordW >= objects[i].x &&
            y <= objects[i].y + objects[i].height &&
            y + swordH >= objects[i].y
          ) {
            if (objects[i].isEnemy) {
              objects[i].health! -= 1;
              if (objects[i].health! <= 0) {
                playSound(sounds.enemyDie);
                alert("Achievment Unlocked: First kill(Minting onchain)")
                objects.splice(i, 1);
              } else {
                playSound(sounds.enemyHit);
              }
            }
          }
        }
      }
    };

    const drawLink = () => {
      let speed = 2;
      animationCounter++;
      if (playPickUpItemAnimation) {
        animationCounter++;
        if (animationCounter < 300) {
          ctx?.drawImage(link1, 1, 150, 16, 16, linkX, linkY, 16, 16);
        } else {
          playPickUpItemAnimation = false;
        }
        switch (lastPickUpItem) {
          case 14:
            ctx?.drawImage(hud, 555, 137, 8, 16, linkX - 2, linkY - 14, 8, 16);
            break;
        }
      } else {
        if (isAttacking && hasSword) {
          if (currentAnimation === 0) {
            if (lastButtonPressed === "down") {
              ctx?.drawImage(link1, 0, 60, 16, 16, linkX, linkY, 16, 16);
            }
            if (lastButtonPressed === "up") {
              ctx?.drawImage(link1, 62, 60, 16, 16, linkX, linkY, 16, 16);
            }
            if (lastButtonPressed === "left") {
              ctx?.drawImage(link1, 30, 60, 16, 16, linkX, linkY, 16, 16);
            }
            if (lastButtonPressed === "right") {
              ctx?.drawImage(link1, 91, 60, 16, 16, linkX, linkY, 16, 16);
            }
          } else if (currentAnimation === 1) {
            if (lastButtonPressed === "down") {
              ctx?.drawImage(link1, 0, 84, 16, 27, linkX, linkY, 16, 27);
              gameObjectCollision(linkX + 7, linkY + 16, gameObjects, false, true);
            }
            if (lastButtonPressed === "up") {
              ctx?.drawImage(link1, 62, 84, 16, 26, linkX, linkY - 14, 16, 26);
              gameObjectCollision(linkX + 3, linkY - 14, gameObjects, false, true);
            }
            if (lastButtonPressed === "left") {
              ctx?.drawImage(link1, 22, 84, 26, 27, linkX - 10, linkY - 8, 27, 27);
              gameObjectCollision(linkX - 8, linkY + 5, gameObjects, false, true);
            }
            if (lastButtonPressed === "right") {
              ctx?.drawImage(link1, 84, 84, 30, 26, linkX, linkY - 8, 30, 26);
              gameObjectCollision(linkX + 14, linkY + 5, gameObjects, false, true);
            }
          }
          if (animationCounter >= 6) {
            currentAnimation++;
            animationCounter = 0;
            if (currentAnimation > 1) {
              currentAnimation = 0;
              isAttacking = false;
              canAttackAgain = true;
            }
          }
        } else if (leftPressed && !collision(linkX - speed, linkY, gameMap!)) {
          linkX -= speed;
          if (currentAnimation === 0) {
            ctx?.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
          } else if (currentAnimation === 1) {
            ctx?.drawImage(link1, 30, 30, 16, 16, linkX, linkY, 16, 16);
          }
          if (animationCounter >= 6) {
            currentAnimation++;
            animationCounter = 0;
            if (currentAnimation > 1) {
              currentAnimation = 0;
            }
          }
        } else if (rightPressed && !collision(linkX + speed, linkY, gameMap!)) {
          linkX += speed;
          if (currentAnimation === 0) {
            ctx?.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
          } else if (currentAnimation === 1) {
            ctx?.drawImage(link1, 91, 30, 16, 16, linkX, linkY, 16, 16);
          }
          if (animationCounter >= 6) {
            currentAnimation++;
            animationCounter = 0;
            if (currentAnimation > 1) {
              currentAnimation = 0;
            }
          }
        } else if (upPressed && !collision(linkX, linkY - speed, gameMap!)) {
          linkY -= speed;
          if (currentAnimation === 0) {
            ctx?.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
          } else if (currentAnimation === 1) {
            ctx?.drawImage(link1, 62, 30, 16, 16, linkX, linkY, 16, 16);
          }
          if (animationCounter >= 6) {
            currentAnimation++;
            animationCounter = 0;
            if (currentAnimation > 1) {
              currentAnimation = 0;
            }
          }
        } else if (downPressed && !collision(linkX, linkY + speed, gameMap!)) {
          linkY += speed;
          if (currentAnimation === 0) {
            ctx?.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
          } else if (currentAnimation === 1) {
            ctx?.drawImage(link1, 0, 30, 16, 16, linkX, linkY, 16, 16);
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
            ctx?.drawImage(link1, 0, 0, 16, 16, linkX, linkY, 16, 16);
          }
          if (lastButtonPressed === 'up') {
            ctx?.drawImage(link1, 62, 0, 16, 16, linkX, linkY, 16, 16);
          }
          if (lastButtonPressed === 'left') {
            ctx?.drawImage(link1, 30, 0, 16, 16, linkX, linkY, 16, 16);
          }
          if (lastButtonPressed === 'right') {
            ctx?.drawImage(link1, 91, 0, 16, 16, linkX, linkY, 16, 16);
          }
        }
      }
    };

    const drawMap = (level: number[][]) => {
      if (!ctx) return;
      for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
          ctx.drawImage(
            worldTiles,
            (level[i][j] % 18) * 17 + 1,
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

    const drawGameObjects = () => {
      for (let i = 0; i < gameObjects.length; i++) {
        if (gameObjects[i].isPickUpItem) {
          switch (gameObjects[i].pickUpItemNum) {
            case 14:
              ctx?.drawImage(hud, 555, 137, 8, 16, gameObjects[i].x, gameObjects[i].y, 8, 16);
              break;
          }
        }
        if (gameObjects[i].isText) {
          gameObjects[i].counter = (gameObjects[i].counter || 0) + 1;
          if (gameObjects[i].counter % 5 === 0) {
            if (gameObjects[i].line1Full!.length !== gameObjects[i].line1Current!.length) {
              gameObjects[i].line1Current = gameObjects[i].line1Full!.substring(0, gameObjects[i].line1Current!.length + 1);
              playSound(sounds.textSlow);
            } else if (gameObjects[i].line2Full!.length !== gameObjects[i].line2Current!.length) {
              gameObjects[i].line2Current = gameObjects[i].line2Full!.substring(0, gameObjects[i].line2Current!.length + 1);
              playSound(sounds.textSlow);
            }
          }

          ctx!.fillStyle = 'white';
          ctx!.font = '12px Arial';
          ctx!.fillText(gameObjects[i].line1Current!, gameObjects[i].line1X!, gameObjects[i].line1Y!);
          ctx!.fillText(gameObjects[i].line2Current!, gameObjects[i].line2X!, gameObjects[i].line2Y!);
        }
        if (gameObjects[i].isFlame) {
          gameObjects[i].counter = (gameObjects[i].counter || 0) + 1;
          if (gameObjects[i].counter % 5 === 0) {
            gameObjects[i].imageNum = (gameObjects[i].imageNum || 0) + 1;
          }
          if (gameObjects[i].imageNum! > 1) {
            gameObjects[i].imageNum = 0;
          }
          if (gameObjects[i].imageNum === 0) {
            ctx?.drawImage(chars2, 158, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
          } else {
            ctx?.drawImage(chars1, 52, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
          }
        }
        if (gameObjects[i].isOldMan) {
          ctx?.drawImage(chars1, 1, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
        }
        if (gameObjects[i].isOldWoman) {
          ctx?.drawImage(chars1, 35, 11, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
        }
        if (gameObjects[i].isEnemy) {
          if (gameObjects[i].enemyType === 1) {
            gameObjects[i].counter++;
            if (gameObjects[i].counter >= 10) {
              gameObjects[i].frame++;
              gameObjects[i].counter = 0;
              if (gameObjects[i].frame > 1) {
                gameObjects[i].frame = 0;
              }
            }
            if (gameObjects[i].direction === 'down') {
              if (gameObjects[i].frame === 0) {
                ctx?.drawImage(enemies, 0, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              } else if (gameObjects[i].frame === 1) {
                ctx?.drawImage(enemies, 0, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              }
            } else if (gameObjects[i].direction === 'up') {
              if (gameObjects[i].frame === 0) {
                ctx?.drawImage(enemies, 60, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              } else if (gameObjects[i].frame === 1) {
                ctx?.drawImage(enemies, 60, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              }
            } else if (gameObjects[i].direction === 'left') {
              if (gameObjects[i].frame === 0) {
                ctx?.drawImage(enemies, 30, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              } else if (gameObjects[i].frame === 1) {
                ctx?.drawImage(enemies, 30, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              }
            } else {
              if (gameObjects[i].frame === 0) {
                ctx?.drawImage(enemies, 90, 0, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              } else if (gameObjects[i].frame === 1) {
                ctx?.drawImage(enemies, 90, 30, 16, 16, gameObjects[i].x, gameObjects[i].y, 16, 16);
              }
            }
          }
        }
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height); // Clear the canvas
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height); // Fill background
      drawMap(gameMap!);
      drawLink();
      gameObjectCollision(linkX, linkY, gameObjects, true);
      drawGameObjects();
      drawHUD(ctx, currentLinkHearts, linkHearts);
      requestAnimationFrame(draw);
    };

    worldTiles.onload = () => {
      draw();
    };

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return <canvas ref={canvasRef} width="256" height="240" style={{ background: '#eee', display: 'block', margin: '0 auto' }} />;
};

export default GameCanvas;
