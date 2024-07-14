// utils/drawHUD.ts
const drawHUD = (ctx: CanvasRenderingContext2D | null, currentLinkHearts: number, linkHearts: number) => {
  if (!ctx) return;

  let hud = new Image();
  hud.src = '/pausescreen.png';

  ctx.drawImage(hud, 258, 11, 256, 56, 0, 0, 256, 56);
  ctx.fillStyle = "black";
  ctx.fillRect(176, 32, 64, 16);

  let fullHearts = Math.floor(currentLinkHearts);
  let halfHearts = currentLinkHearts - fullHearts;
  for (let i = 0; i < linkHearts; i++) {
    let heartY = 40;
    let heartX = 176 + (i * 8);
    if (i > 7) {
      heartY = 32;
      heartX -= 64;
    }
    ctx.drawImage(hud, 627, 117, 8, 8, heartX, heartY, 8, 8);
  }
  for (let i = 0; i < fullHearts; i++) {
    let heartY = 40;
    let heartX = 176 + (i * 8);
    if (i > 7) {
      heartY = 32;
      heartX -= 64;
    }
    ctx.drawImage(hud, 645, 117, 8, 8, heartX, heartY, 8, 8);
  }
  if (halfHearts > 0) {
    let heartY = 40;
    let heartX = 176 + (fullHearts * 8);
    if (fullHearts > 7) {
      heartY = 32;
      heartX -= 64;
    }
    ctx.drawImage(hud, 636, 117, 8, 8, heartX, heartY, 8, 8);
  }
};

export default drawHUD;
