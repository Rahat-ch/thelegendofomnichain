import { counterAbi } from "./abi";
const counterAddress = "0xeaE184E93f2a38d642Ae016f2a53110a2c5d1FCB";

export { counterAbi, counterAddress };


export const fps = 60;

export const map7_7 = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [61, 61, 61, 61, 61, 61, 61, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 61, 28, 61, 62, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 62, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 62, 2, 2, 2, 2, 2, 2, 61, 61, 61, 61, 61, 61, 61],
  [61, 62, 2, 2, 2, 2, 2, 2, 2, 60, 61, 61, 61, 61, 61, 61],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [43, 44, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 43, 43],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 61, 61],
  [61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
  [61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61]
];

export const mapWoodSword = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
  [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
  [55, 55, 37, 37, 37, 37, 37, 28, 28, 37, 37, 37, 37, 37, 55, 55],
  [55, 55, 55, 55, 55, 55, 55, 28, 28, 55, 55, 55, 55, 55, 55, 55]
];


export class MapBundle {
  map: number[][];
  gameObjects: GameObject[];

  constructor(m: number[][], o: GameObject[]) {
    this.map = m;
    this.gameObjects = o;
  }
}

export const worldTilesSrc = '/chars.png';
export const chars1Src = '/chars.png';
export const chars2Src = '/chars2.png';
export const link1Src = '/link.png';
export const hudSrc = '/pausescreen.png';
export const enemiesSrc = '/enemies.png';

export const hudAssets = {
  hud: '/pausescreen.png',
  heartFull: { x: 645, y: 117, width: 8, height: 8 },
  heartHalf: { x: 636, y: 117, width: 8, height: 8 },
  heartEmpty: { x: 627, y: 117, width: 8, height: 8 },
};

export const sounds = {
  swordSlash: './sounds/LOZ_sword_slash.wav',
  item: './sounds/item.mp3',
  textSlow: './sounds/LOZ_text_slow.wav'
};


export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  newMap?: number;
  newLinkX?: number;
  newLinkY?: number;
  isPortal?: boolean;
  counter?: number;
  imageNum?: number;
  isText?: boolean;
  line1Full?: string;
  line2Full?: string;
  line1Current?: string;
  line2Current?: string;
  line1X?: number;
  line1Y?: number;
  line2X?: number;
  line2Y?: number;
  isOldMan?: boolean;
  isPickUpItem?: boolean;
  pickUpItemNum?: number;
  isFlame?: boolean;
  isOldWoman?: boolean;
  isRupee?: boolean;
  rupeeValue?: number;
  isEnemy?: boolean;
  enemyType?: number;
  direction?: string;
  frame?: number;
  isAttacking?: boolean;
  health?: number;
}

export interface MapBundle {
  map: number[][];
  gameObjects: GameObject[];
}