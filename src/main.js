import Phaser from '../node_modules/phaser/dist/phaser.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let snake;
let food;
let cursors;

function preload() {
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/body.png');
}

function create() {
    const Snake = new Phaser.Class({
        initialize: function Snake(scene, x, y) {
            this.headPosition = new Phaser.Geom.Point(x, y);
            this.body = scene.add.group();
            this.head = this.body.create(x * 16, y * 16, 'body');
            this.alive = true;
            this.speed = 100;
            this.moveTime = 0;
            this.tail = new Phaser.Geom.Point(x, y);
            this.heading = Phaser.Math.Vector2.DOWN;
            this.direction = Phaser.Math.Vector2.DOWN;
        },
        update: function (time) {
            if (time >= this.moveTime) {
                return this.move(time);
            }
        },
        faceLeft: function () {
            if (this.direction !== Phaser.Math.Vector2.RIGHT) {
                this.heading = Phaser.Math.Vector2.LEFT;
            }
        },
        faceRight: function () {
            if (this.direction !== Phaser.Math.Vector2.LEFT) {
                this.heading = Phaser.Math.Vector2.RIGHT;
            }
        },
        faceUp: function () {
            if (this.direction !== Phaser.Math.Vector2.DOWN) {
                this.heading = Phaser.Math.Vector2.UP;
            }
        },
        faceDown: function () {
            if (this.direction !== Phaser.Math.Vector2.UP) {
                this.heading = Phaser.Math.Vector2.DOWN;
            }
        },
        move: function (time) {
            this.headPosition.x += this.heading.x;
            this.headPosition.y += this.heading.y;

            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x, 0, 40);
            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y, 0, 30);

            this.direction = this.heading;
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);
            this.moveTime = time + this.speed;
            return true;
        }
    });

    snake = new Snake(this, 8, 8);
    food = this.add.image(Phaser.Math.Between(0, 39) * 16, Phaser.Math.Between(0, 29) * 16, 'food');
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
    if (!snake.alive) {
        return;
    }

    if (cursors.left.isDown) {
        snake.faceLeft();
    } else if (cursors.right.isDown) {
        snake.faceRight();
    } else if (cursors.up.isDown) {
        snake.faceUp();
    } else if (cursors.down.isDown) {
        snake.faceDown();
    }

    if (snake.update(time)) {
        if (snake.head.x === food.x && snake.head.y === food.y) {
            food.setPosition(Phaser.Math.Between(0, 39) * 16, Phaser.Math.Between(0, 29) * 16);
        }
    }
}