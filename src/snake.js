
class Snake {
  constructor(scene) {
    this.scene = scene;
    this.body = [];
    this.body.push(this.scene.add.sprite(100, 100, 'body'));
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.nextDirection = Phaser.Math.Vector2.RIGHT;
  }

  update(cursors) {
    if (cursors.left.isDown && this.direction !== Phaser.Math.Vector2.RIGHT) {
      this.nextDirection = Phaser.Math.Vector2.LEFT;
    } else if (cursors.right.isDown && this.direction !== Phaser.Math.Vector2.LEFT) {
      this.nextDirection = Phaser.Math.Vector2.RIGHT;
    } else if (cursors.up.isDown && this.direction !== Phaser.Math.Vector2.DOWN) {
      this.nextDirection = Phaser.Math.Vector2.UP;
    } else if (cursors.down.isDown && this.direction !== Phaser.Math.Vector2.UP) {
      this.nextDirection = Phaser.Math.Vector2.DOWN;
    }

    this.direction = this.nextDirection;

    let x = this.body[0].x;
    let y = this.body[0].y;

    if (this.direction === Phaser.Math.Vector2.LEFT) {
      x -= 20;
    } else if (this.direction === Phaser.Math.Vector2.RIGHT) {
      x += 20;
    } else if (this.direction === Phaser.Math.Vector2.UP) {
      y -= 20;
    } else if (this.direction === Phaser.Math.Vector2.DOWN) {
      y += 20;
    }

    if (this.checkCollision(x, y)) {
      this.scene.scene.restart();
      return false;
    }

    const newPart = this.scene.add.sprite(x, y, 'body');
    this.body.unshift(newPart);

    if (newPart.x === this.scene.food.x && newPart.y === this.scene.food.y) {
      return true;
    } else {
      this.body.pop().destroy();
      return false;
    }
  }

  checkCollision(x, y) {
    if (x < 0 || x >= 800 || y < 0 || y >= 600) {
      return true;
    }

    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i].x === x && this.body[i].y === y) {
        return true;
      }
    }
    return false;
  }
}

export default Snake;
