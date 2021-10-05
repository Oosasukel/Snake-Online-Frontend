import { GameState, Player } from 'pagesComponents/Game/context/schema';
import { theme } from 'theme';
import { Sound } from 'utils/Sound';

const pickFruitSong = new Sound('/sounds/beads.wav');
const gameOverSound = new Sound('/sounds/game_over.ogg');

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
  private currentState: GameState;

  private radius = 0;
  private gap = 0;
  private strokeWidth = 0;
  private slotSize = 0;

  private backgroundPath: Path2D;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private mapSize: number,
    private currentPlayerId: string,
    initialState: GameState
  ) {
    this.currentState = initialState;
    this.canvasResize();
  }

  private gameOver(): boolean {
    const playersAlive: Player[] = [];

    this.currentState.players.forEach((player) => {
      if (player.body.length > 0) {
        playersAlive.push(player);
      }
    });

    if (
      (this.currentState.players.length > 1 && playersAlive.length < 2) ||
      (this.currentState.players.length === 1 && playersAlive.length === 0)
    ) {
      return true;
    }

    return false;
  }

  private someFruitWasCollected(previousState: GameState, newState: GameState) {
    for (let i = 0; i < previousState.fruits.length; i++) {
      const previousFruit = previousState.fruits[i];

      let thisFruitExists = false;
      for (let j = 0; j < newState.fruits.length; j++) {
        const currentNewFruit = newState.fruits[j];

        if (
          previousFruit.x === currentNewFruit.x &&
          previousFruit.y === currentNewFruit.y
        ) {
          thisFruitExists = true;
        }
      }

      if (!thisFruitExists) return true;
    }

    return false;
  }

  drawGame(state: GameState) {
    (window as any).state = state;

    if (this.someFruitWasCollected(this.currentState, state)) {
      pickFruitSong.play();
    }

    this.currentState = state;

    if (this.gameOver()) {
      gameOverSound.play();
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawBackground();

    this.drawUsers();

    this.drawFruits();
  }

  private drawUsers() {
    const usersBodyPath = new Path2D();
    const usersHeadPath = new Path2D();
    let activeHeadPath: Path2D;

    const activePlayer = this.currentState.players.find(
      (user) => user.id === this.currentPlayerId
    );

    if (activePlayer) {
      activeHeadPath = this.createFillPath(
        activePlayer.head.x,
        activePlayer.head.y
      );
    }

    this.currentState.players.forEach((user) => {
      if (this.dead(user)) return;
      user.body.forEach(({ x, y }) => {
        usersBodyPath.addPath(this.createFillPath(x, y));
      });

      if (user.id !== this.currentPlayerId) {
        usersHeadPath.addPath(this.createFillPath(user.head.x, user.head.y));
      }
    });

    this.ctx.save();

    this.ctx.fillStyle = colors.body;
    this.ctx.shadowColor = colors.body;
    this.ctx.fill(usersBodyPath);

    this.ctx.fillStyle = colors.head;
    this.ctx.shadowColor = colors.head;
    this.ctx.fill(usersHeadPath);

    if (activeHeadPath) {
      this.ctx.fillStyle = colors.active;
      this.ctx.shadowColor = colors.active;
      this.ctx.fill(activeHeadPath);
    }

    this.ctx.restore();
  }

  private drawFruits() {
    const fruitsPath = new Path2D();

    this.currentState.fruits.forEach((fruit) => {
      fruitsPath.addPath(this.createFillPath(fruit.x, fruit.y));
    });

    this.ctx.save();

    this.ctx.fillStyle = colors.fruit;
    this.ctx.shadowColor = colors.fruit;
    this.ctx.fill(fruitsPath);

    this.ctx.restore();
  }

  private dead(player: Player) {
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

    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.shadowBlur = this.slotSize / 16;

    this.backgroundPath = this.createBackgroundPath();

    this.drawGame(this.currentState);
  }

  private drawBackground() {
    this.ctx.stroke(this.backgroundPath);
  }

  private createBackgroundPath() {
    const path = new Path2D();

    for (let i = 0; i < this.mapSize; i++) {
      for (let j = 0; j < this.mapSize; j++) {
        path.addPath(this.createStrokePath(i, j));
      }
    }

    return path;
  }

  private createStrokePath(x: number, y: number) {
    const initialPathX =
      this.gap + x * this.gap + x * this.slotSize + this.strokeWidth / 2;
    const initialPathY =
      this.gap + y * this.gap + y * this.slotSize + this.strokeWidth / 2;
    const width = this.slotSize - this.strokeWidth;
    const height = this.slotSize - this.strokeWidth;

    const path = new Path2D();

    path.moveTo(initialPathX + this.radius, initialPathY);
    path.lineTo(initialPathX + width - this.radius, initialPathY);
    path.quadraticCurveTo(
      initialPathX + width,
      initialPathY,
      initialPathX + width,
      initialPathY + this.radius
    );
    path.lineTo(initialPathX + width, initialPathY + height - this.radius);
    path.quadraticCurveTo(
      initialPathX + width,
      initialPathY + height,
      initialPathX + width - this.radius,
      initialPathY + height
    );
    path.lineTo(initialPathX + this.radius, initialPathY + height);
    path.quadraticCurveTo(
      initialPathX,
      initialPathY + height,
      initialPathX,
      initialPathY + height - this.radius
    );
    path.lineTo(initialPathX, initialPathY + this.radius);
    path.quadraticCurveTo(
      initialPathX,
      initialPathY,
      initialPathX + this.radius,
      initialPathY
    );
    path.closePath();

    return path;
  }

  private createFillPath(x: number, y: number) {
    const initialPathX = this.gap + x * this.gap + x * this.slotSize;
    const initialPathY = this.gap + y * this.gap + y * this.slotSize;
    const width = this.slotSize;
    const height = this.slotSize;

    const path = new Path2D();

    path.moveTo(initialPathX + this.radius, initialPathY);
    path.lineTo(initialPathX + width - this.radius, initialPathY);
    path.quadraticCurveTo(
      initialPathX + width,
      initialPathY,
      initialPathX + width,
      initialPathY + this.radius
    );
    path.lineTo(initialPathX + width, initialPathY + height - this.radius);
    path.quadraticCurveTo(
      initialPathX + width,
      initialPathY + height,
      initialPathX + width - this.radius,
      initialPathY + height
    );
    path.lineTo(initialPathX + this.radius, initialPathY + height);
    path.quadraticCurveTo(
      initialPathX,
      initialPathY + height,
      initialPathX,
      initialPathY + height - this.radius
    );
    path.lineTo(initialPathX, initialPathY + this.radius);
    path.quadraticCurveTo(
      initialPathX,
      initialPathY,
      initialPathX + this.radius,
      initialPathY
    );
    path.closePath();

    return path;
  }
}
