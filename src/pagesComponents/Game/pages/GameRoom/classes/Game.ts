import { Game as IGame, GameUser } from 'pagesComponents/Game/context/types';
import { theme } from 'theme';

const colors = {
  body: theme.colors.snakeBody,
  head: theme.colors.primary,
  fruit: theme.colors.danger,

  active: theme.colors.success,
};

export class Game {
  private strokeColor = theme.colors.border;

  private relativeGap = 0.16;
  private relativeStrokeWidth = 0.02;
  private relativeRadius = 0.095;

  private radius = 0;
  private gap = 0;
  private strokeWidth = 0;
  private slotSize = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private mapSize: number,
    private currentPlayerId: string
  ) {
    this.canvasResize();
  }

  drawGame(state: IGame) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.mapSize; i++) {
      for (let j = 0; j < this.mapSize; j++) {
        this.drawRect(i, j);
      }
    }

    state.users.forEach((user) => {
      if (this.dead(user)) return;

      user.body.forEach(({ x, y }) => this.drawRect(x, y, 'body'));
      this.drawRect(
        user.head.x,
        user.head.y,
        user.id === this.currentPlayerId ? 'active' : 'head'
      );
    });

    state.fruits.forEach(({ x, y }) => this.drawRect(x, y, 'fruit'));
  }

  private dead(player: GameUser) {
    return player.body.length === 0;
  }

  canvasResize() {
    const parentHeight = this.ctx.canvas.parentElement?.offsetHeight as number;
    const parentWidth = this.ctx.canvas.parentElement?.offsetWidth as number;
    const canvasSize = Math.min(parentHeight, parentWidth);

    this.ctx.canvas.width = canvasSize;
    this.ctx.canvas.height = canvasSize;

    this.gap = (canvasSize / this.mapSize) * this.relativeGap;
    this.strokeWidth = (canvasSize / this.mapSize) * this.relativeStrokeWidth;
    this.slotSize = (canvasSize - this.gap * (this.mapSize + 1)) / this.mapSize;
    this.radius = this.slotSize * this.relativeRadius;
  }

  private drawRect(x: number, y: number, fillColor?: keyof typeof colors) {
    const initialRectX = this.gap + x * this.gap + x * this.slotSize;
    const initialRectY = this.gap + y * this.gap + y * this.slotSize;

    this.roundRect(
      initialRectX,
      initialRectY,
      fillColor ? colors[fillColor] : undefined
    );
  }

  private roundRect(x: number, y: number, fillColor?: string) {
    let width = this.slotSize;
    let height = this.slotSize;

    if (!fillColor) {
      x += this.strokeWidth / 2;
      y += this.strokeWidth / 2;
      width -= this.strokeWidth;
      height -= this.strokeWidth;
    }

    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(x + this.radius, y);
    this.ctx.lineTo(x + width - this.radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + this.radius);
    this.ctx.lineTo(x + width, y + height - this.radius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - this.radius,
      y + height
    );
    this.ctx.lineTo(x + this.radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - this.radius);
    this.ctx.lineTo(x, y + this.radius);
    this.ctx.quadraticCurveTo(x, y, x + this.radius, y);
    this.ctx.closePath();

    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.shadowColor = fillColor;
      this.ctx.shadowBlur = width / 16;

      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = this.strokeWidth;

      this.ctx.stroke();
    }

    // if (fillColor === '#baaafe') {
    //   const image = new Image();
    //   image.onload = () => {
    //     const imageWidth = this.slotSize * 3 + this.gap * 4;
    //     const imageX = x - this.slotSize - this.gap * 2;
    //     const imageY = y - this.slotSize - this.gap * 2;
    //     this.ctx.drawImage(image, imageX, imageY, imageWidth, imageWidth);
    //   };
    //   image.src = './hat.png';
    // }

    this.ctx.restore();
  }
}
