import Phaser from 'phaser';
import Snake from './snake';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('body', 'assets/body.png');
    this.load.image('food', 'assets/food.png');
  }

  create() {
    this.snake = new Snake(this);
    this.food = this.add.sprite(Phaser.Math.Between(0, 39) * 20, Phaser.Math.Between(0, 29) * 20, 'food');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: 150,
      callback: this.updateGame,
      callbackScope: this,
      loop: true,
    });
  }

  updateGame() {
    if (this.snake.update(this.cursors)) {
      this.food.setPosition(Phaser.Math.Between(0, 39) * 20, Phaser.Math.Between(0, 29) * 20);
    }
  }
}

export default GameScene;